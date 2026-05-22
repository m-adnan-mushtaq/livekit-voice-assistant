from datetime import date, datetime, time, timedelta, timezone
import asyncio
import uuid

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import aliased, selectinload

from app.modules.bookings.models.model import Booking
from app.modules.bookings.schemas.booking import BookingCreate, BookingCreateRequest
from app.modules.notifications.services.notification_service import create_notification_log
from app.modules.user.models.user import User
from app.services.meeting import CalService


ACTIVE_BOOKING_STATUSES = ("pending", "confirmed")
BOOKING_VISIBLE_STATUSES = ("pending", "confirmed",
                            "rejected", "cancelled", "completed")


def _role_name(user: User) -> str:
    return str(getattr(getattr(user, "role", None), "name", "")).lower()


def _require_admin(user: User) -> None:
    if _role_name(user) != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can perform this action",
        )


def _date_range_to_datetimes(start_date: date, end_date: date) -> tuple[datetime, datetime]:
    if end_date < start_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="end_date must be greater than or equal to start_date",
        )
    return (
        datetime.combine(start_date, time.min, tzinfo=timezone.utc),
        datetime.combine(end_date + timedelta(days=1),
                         time.min, tzinfo=timezone.utc),
    )


async def _get_user_or_404(db: AsyncSession, user_id: uuid.UUID) -> User:
    result = await db.execute(
        select(User)
        .where(User.id == user_id)
        .options(selectinload(User.role))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


async def _get_staff_or_404(db: AsyncSession, staff_id: uuid.UUID) -> User:
    staff = await _get_user_or_404(db, staff_id)
    if _role_name(staff) != "staff" or not staff.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected staff member is not available",
        )
    return staff


async def get_booking_by_id(db: AsyncSession, booking_id: uuid.UUID) -> Booking | None:
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    return result.scalar_one_or_none()


async def get_overlapping_booking(
    db: AsyncSession,
    staff_id: uuid.UUID,
    start_time: datetime,
    end_time: datetime,
    exclude_booking_id: uuid.UUID | None = None,
) -> Booking | None:
    stmt = select(Booking).where(
        Booking.staff_id == staff_id,
        Booking.status.in_(ACTIVE_BOOKING_STATUSES),
        Booking.start_time < end_time,
        Booking.end_time > start_time,
    )

    if exclude_booking_id:
        stmt = stmt.where(Booking.id != exclude_booking_id)

    result = await db.execute(stmt.limit(1))
    return result.scalar_one_or_none()


async def _ensure_staff_slot_is_free(
    db: AsyncSession,
    staff_id: uuid.UUID,
    start_time: datetime,
    end_time: datetime,
) -> None:
    overlapping_booking = await get_overlapping_booking(db, staff_id, start_time, end_time)
    if overlapping_booking:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Staff member already has a booking during this time",
        )


async def get_staff_bookings_between_dates(
    db: AsyncSession,
    staff_ids: list[uuid.UUID],
    start_time: datetime,
    end_time: datetime,
) -> list[Booking]:
    if not staff_ids:
        return []

    result = await db.execute(
        select(Booking).where(
            Booking.staff_id.in_(staff_ids),
            Booking.status.in_(ACTIVE_BOOKING_STATUSES),
            Booking.start_time < end_time,
            Booking.end_time > start_time,
        )
    )
    return list(result.scalars().all())


def _serialize_booking_rows(rows) -> list[dict]:
    return [
        {
            "id": row["id"],
            "customer": {
                "id": row["customer_id"],
                "full_name": row["customer_name"],
                "email": row["customer_email"],
            },
            "staff": {
                "id": row["staff_id"],
                "full_name": row["staff_name"],
                "email": row["staff_email"],
            },
            "start_time": row["start_time"],
            "end_time": row["end_time"],
            "status": row["status"],
            "session_type": row["session_type"],
            "meeting_url": row["meeting_url"],
            "yoga_goal": row["yoga_goal"],
            "experience_level": row["experience_level"],
            "conversation_summary": row["conversation_summary"],
        }
        for row in rows
    ]


def _serialize_booking_detail(row) -> dict:
    return {
        "id": row["id"],
        "customer": {
            "id": row["customer_id"],
            "full_name": row["customer_name"],
            "email": row["customer_email"],
        },
        "staff": {
            "id": row["staff_id"],
            "full_name": row["staff_name"],
            "email": row["staff_email"],
        },
        "start_time": row["start_time"],
        "end_time": row["end_time"],
        "status": row["status"],
        "session_type": row["session_type"],
        "meeting_url": row["meeting_url"],
        "yoga_goal": row["yoga_goal"],
        "experience_level": row["experience_level"],
        "conversation_summary": row["conversation_summary"],
    }


async def get_booking_detail(
    db: AsyncSession,
    booking_id: uuid.UUID,
    current_user: User,
) -> dict:
    customer = aliased(User)
    staff = aliased(User)

    stmt = (
        select(
            Booking.id,
            Booking.start_time,
            Booking.end_time,
            Booking.status,
            Booking.session_type,
            Booking.meeting_url,
            Booking.yoga_goal,
            Booking.experience_level,
            Booking.conversation_summary,
            customer.id.label("customer_id"),
            customer.name.label("customer_name"),
            customer.email.label("customer_email"),
            staff.id.label("staff_id"),
            staff.name.label("staff_name"),
            staff.email.label("staff_email"),
        )
        .join(customer, Booking.customer_id == customer.id)
        .join(staff, Booking.staff_id == staff.id)
        .where(Booking.id == booking_id)
    )

    row = (await db.execute(stmt)).mappings().first()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    role_name = _role_name(current_user)
    if role_name == "staff" and row["staff_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden",
        )
    if role_name not in ("admin", "staff") and row["customer_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden",
        )

    return _serialize_booking_detail(row)


async def list_bookings(
    db: AsyncSession,
    current_user: User,
    start_date: date | None = None,
    end_date: date | None = None,
    upcoming_only: bool = False,
    status_filter: str | None = None,
) -> list[dict]:
    if bool(start_date) != bool(end_date):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="start_date and end_date must be provided together",
        )

    customer = aliased(User)
    staff = aliased(User)

    stmt = (
        select(
            Booking.id,
            Booking.start_time,
            Booking.end_time,
            Booking.status,
            Booking.session_type,
            Booking.meeting_url,
            Booking.yoga_goal,
            Booking.experience_level,
            Booking.conversation_summary,
            customer.id.label("customer_id"),
            customer.name.label("customer_name"),
            customer.email.label("customer_email"),
            staff.id.label("staff_id"),
            staff.name.label("staff_name"),
            staff.email.label("staff_email"),
        )
        .join(customer, Booking.customer_id == customer.id)
        .join(staff, Booking.staff_id == staff.id)
        .order_by(Booking.start_time.asc())
    )

    role_name = _role_name(current_user)
    if role_name == "staff":
        stmt = stmt.where(Booking.staff_id == current_user.id)
    elif role_name != "admin":
        stmt = stmt.where(Booking.customer_id == current_user.id)

    if start_date and end_date:
        start_time, end_time = _date_range_to_datetimes(start_date, end_date)
        stmt = stmt.where(Booking.start_time < end_time,
                          Booking.end_time > start_time)
    elif upcoming_only:
        stmt = stmt.where(Booking.end_time >= datetime.now(timezone.utc))

    if status_filter:
        if status_filter not in BOOKING_VISIBLE_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid booking status")
        stmt = stmt.where(Booking.status == status_filter)

    rows = (await db.execute(stmt)).mappings().all()
    return _serialize_booking_rows(rows)


async def _create_cal_booking(customer: User, payload: BookingCreate) -> dict:
    start_utc = payload.start_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    cal_booking = await asyncio.to_thread(
        CalService.create_booking,
        start_utc,
        customer.name,
        customer.email,
    )
    if not cal_booking:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Meeting creation failed",
        )
    return cal_booking


def _meeting_url_from_cal_booking(cal_booking: dict) -> str | None:
    return (
        cal_booking.get("meeting_url")
        or cal_booking.get("video_call_url")
        or cal_booking.get("location")
        or cal_booking.get("uid")
    )


async def create_booking(db: AsyncSession, payload: BookingCreate) -> Booking:
    customer = await _get_user_or_404(db, payload.customer_id)
    await _get_staff_or_404(db, payload.staff_id)
    await _ensure_staff_slot_is_free(db, payload.staff_id, payload.start_time, payload.end_time)

    cal_booking = await _create_cal_booking(customer, payload)
    booking = Booking(
        **payload.model_dump(),
        meeting_url=_meeting_url_from_cal_booking(cal_booking),
    )
    db.add(booking)
    await db.flush()
    await db.refresh(booking)
    return booking


async def create_booking_for_user(
    db: AsyncSession,
    current_user: User,
    payload: BookingCreateRequest,
) -> Booking:
    if _role_name(current_user) in {"admin", "staff"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only customers can create booking requests",
        )

    booking_payload = BookingCreate(
        customer_id=current_user.id, **payload.model_dump())
    return await create_booking(db, booking_payload)


async def decide_booking(
    db: AsyncSession,
    booking_id: uuid.UUID,
    current_user: User,
    decision: str,
    reason: str | None = None,
) -> Booking:
    _require_admin(current_user)

    if decision not in {"confirmed", "rejected"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid booking decision")

    booking = await get_booking_by_id(db, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    booking.status = decision
    await db.flush()

    if decision == "confirmed":
        title = "Booking Approved"
        message = "Your yoga session has been approved."
        notification_type = "booking_approved"
    else:
        title = "Booking Rejected"
        message = reason or "Your yoga session request was not approved."
        notification_type = "booking_rejected"

    await create_notification_log(
        db,
        booking_id=booking.id,
        user_id=booking.customer_id,
        title=title,
        message=message,
        type=notification_type,
    )

    await db.refresh(booking)
    return booking


async def approve_booking(
    db: AsyncSession,
    booking_id: uuid.UUID,
    current_user: User,
) -> Booking:
    return await decide_booking(db, booking_id, current_user, "confirmed")


async def reject_booking(
    db: AsyncSession,
    booking_id: uuid.UUID,
    current_user: User,
    reason: str | None = None,
) -> Booking:
    return await decide_booking(db, booking_id, current_user, "rejected", reason)
