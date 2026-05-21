from collections import defaultdict
from datetime import date, datetime, time, timedelta, timezone
from typing import DefaultDict, Generator
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.bookings.models.model import Booking
from app.modules.shift_settings.models.model import ShiftSettings
from app.modules.shift_settings.schemas.slots import (
    AvailableSlotResponse,
    AvailableStaffSlot,
)
from app.modules.user.models.user import User

from app.modules.bookings.services.booking_service import (
    get_staff_bookings_between_dates,
)
from app.modules.user.services.user_service import get_staff_users


def combine_utc(day: date, value: time) -> datetime:
    return datetime.combine(day, value, tzinfo=timezone.utc)


def generate_slots(
    start: datetime,
    end: datetime,
    duration: timedelta,
) -> Generator[tuple[datetime, datetime], None, None]:

    current = start

    while current + duration <= end:
        yield current, current + duration
        current += duration


async def get_active_shift_settings(db: AsyncSession) -> ShiftSettings | None:
    result = await db.execute(
        select(ShiftSettings)
        .where(ShiftSettings.is_active.is_(True))
        .order_by(ShiftSettings.created_at.desc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def get_available_slots(
    db: AsyncSession,
    start_date: date,
    end_date: date,
) -> list[AvailableSlotResponse]:

    settings: ShiftSettings | None = await get_active_shift_settings(db)

    if not settings:
        return []

    staff_users: list[User] = await get_staff_users(db)

    if not staff_users:
        return []

    staff_ids: list[UUID] = [staff.id for staff in staff_users]

    bookings: list[Booking] = await get_staff_bookings_between_dates(
        db=db,
        staff_ids=staff_ids,
        start_date=combine_utc(start_date, time.min),
        end_date=combine_utc(end_date, time.max),
    )

    duration = timedelta(minutes=settings.duration_minutes)

    busy_map: DefaultDict[UUID, set[datetime]] = defaultdict(set)

    for booking in bookings:
        current = booking.start_time

        while current < booking.end_time:
            busy_map[booking.staff_id].add(current)
            current += duration

    results: list[AvailableSlotResponse] = []

    current_day = start_date

    while current_day <= end_date:

        if current_day.weekday() not in settings.weekdays:
            current_day += timedelta(days=1)
            continue

        work_start = combine_utc(current_day, settings.start_time)
        work_end = combine_utc(current_day, settings.end_time)

        for slot_start, slot_end in generate_slots(
            work_start,
            work_end,
            duration,
        ):

            available_staff: list[AvailableStaffSlot] = [
                AvailableStaffSlot(
                    id=staff.id,
                    full_name=staff.name,
                )
                for staff in staff_users
                if slot_start not in busy_map.get(staff.id, set())
            ]

            if available_staff:
                results.append(
                    AvailableSlotResponse(
                        date=current_day,
                        start_time=slot_start.strftime("%H:%M"),
                        end_time=slot_end.strftime("%H:%M"),
                        available_staff=available_staff,
                    )
                )

        current_day += timedelta(days=1)

    return results
