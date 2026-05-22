from datetime import date, datetime, time, timezone
from typing import Any
from uuid import UUID
from zoneinfo import ZoneInfo

from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import SessionLocal
from app.modules.bookings.schemas.booking import BookingCreateRequest
from app.modules.bookings.services.booking_service import create_booking_for_user, list_bookings
from app.modules.shift_settings.services.slot_service import get_available_slots
from app.modules.user.models.user import User


def _parse_date(value: str) -> date:
    return date.fromisoformat(value)


def _build_utc_datetime(
    date_str: str,
    time_str: str,
    time_zone: str,
) -> datetime:
    d = date.fromisoformat(date_str)
    t = time.fromisoformat(time_str)
    tz = ZoneInfo(time_zone)
    local_dt = datetime.combine(d, t, tzinfo=tz)
    return local_dt.astimezone(timezone.utc)


async def _get_authenticated_user(db: AsyncSession, user_id: str) -> User:
    result = await db.execute(
        select(User)
        .where(User.id == UUID(user_id))
        .options(selectinload(User.role))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise ValueError("Authenticated user was not found")
    return user


async def get_voice_user_bookings(user_id: str) -> dict[str, Any]:
    async with SessionLocal() as db:
        user = await _get_authenticated_user(db, user_id)
        bookings = await list_bookings(db, user, upcoming_only=True)

    return {
        "success": True,
        "bookings": jsonable_encoder(bookings),
        "message": "Upcoming yoga sessions fetched successfully.",
    }


async def get_voice_available_slots(start_date: str, end_date: str) -> list[dict[str, Any]]:
    async with SessionLocal() as db:
        slots = await get_available_slots(db, _parse_date(start_date), _parse_date(end_date))
    return jsonable_encoder(slots)


async def book_voice_session(
    user_id: str,
    staff_id: str,
    booking_date: str,
    start_time: str,
    end_time: str,
    time_zone: str,
    yoga_goal: str | None = None,
    experience_level: str | None = None,
    conversation_summary: str | None = None,
) -> dict[str, Any]:
    payload = BookingCreateRequest(
        staff_id=UUID(staff_id),
        start_time=_build_utc_datetime(booking_date, start_time, time_zone),
        end_time=_build_utc_datetime(booking_date, end_time, time_zone),
        yoga_goal=yoga_goal,
        experience_level=experience_level,
        conversation_summary=conversation_summary,
    )

    async with SessionLocal() as db:
        try:
            user = await _get_authenticated_user(db, user_id)
            booking = await create_booking_for_user(db, user, payload)
            await db.commit()
            await db.refresh(booking)
        except Exception:
            await db.rollback()
            raise

    return {
        "success": True,
        "booking": jsonable_encoder(booking),
        "message": "Yoga session booked successfully.",
    }
