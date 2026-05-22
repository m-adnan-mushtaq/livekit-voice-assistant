from collections import defaultdict
from datetime import date, datetime, time, timedelta, timezone
from typing import DefaultDict, Generator
from uuid import UUID

from zoneinfo import ZoneInfo

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.bookings.models.model import Booking
from app.modules.shift_settings.models.model import ShiftSettings
from app.modules.shift_settings.schemas.slots import (
    AvailableSlotResponse,
    AvailableStaffSlot,
    CreateShiftSettings,
)
from app.modules.user.models.user import User

from app.modules.bookings.services.booking_service import (
    get_staff_bookings_between_dates,
)
from app.modules.user.services.user_service import get_staff_users


def _local_to_utc(day: date, local_time: time, tz: ZoneInfo) -> datetime:
    local_dt = datetime.combine(day, local_time, tzinfo=tz)
    return local_dt.astimezone(timezone.utc)


def _generate_slots(
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

    tz = ZoneInfo(settings.time_zone or "UTC")
    duration = timedelta(minutes=settings.duration_minutes)

    query_start = _local_to_utc(start_date, settings.start_time, tz)
    query_end = _local_to_utc(end_date, settings.end_time, tz)

    staff_ids: list[UUID] = [s.id for s in staff_users]

    bookings: list[Booking] = await get_staff_bookings_between_dates(
        db=db,
        staff_ids=staff_ids,
        start_time=query_start,
        end_time=query_end,
    )

    busy_map: DefaultDict[UUID, set[int]] = defaultdict(set)
    dur_secs = int(duration.total_seconds())

    for b in bookings:
        ts = int(b.start_time.replace(tzinfo=timezone.utc).timestamp())
        end_ts = int(b.end_time.replace(tzinfo=timezone.utc).timestamp())
        while ts < end_ts:
            busy_map[b.staff_id].add(ts)
            ts += dur_secs

    results: list[AvailableSlotResponse] = []
    current_day = start_date

    while current_day <= end_date:
        if current_day.weekday() not in settings.weekdays:
            current_day += timedelta(days=1)
            continue

        work_start_utc = _local_to_utc(current_day, settings.start_time, tz)
        work_end_utc = _local_to_utc(current_day, settings.end_time, tz)

        for slot_start, slot_end in _generate_slots(work_start_utc, work_end_utc, duration):
            slot_ts = int(slot_start.timestamp())

            available_staff: list[AvailableStaffSlot] = [
                AvailableStaffSlot(id=s.id, full_name=s.name)
                for s in staff_users
                if slot_ts not in busy_map.get(s.id, set())
            ]

            if available_staff:
                slot_local_start = slot_start.astimezone(tz)
                slot_local_end = slot_end.astimezone(tz)
                results.append(
                    AvailableSlotResponse(
                        date=slot_local_start.date(),
                        start_time=slot_local_start.strftime("%H:%M"),
                        end_time=slot_local_end.strftime("%H:%M"),
                        available_staff=available_staff,
                    )
                )

        current_day += timedelta(days=1)

    return results


async def create_or_update_shift_settings(
    db: AsyncSession,
    payload: CreateShiftSettings,
) -> ShiftSettings:
    existing = await get_active_shift_settings(db)

    if existing:
        existing.weekdays = payload.weekdays
        existing.name = payload.name
        existing.description = payload.description
        existing.start_time = payload.start_time
        existing.end_time = payload.end_time
        existing.duration_minutes = payload.duration_minutes
        existing.time_zone = payload.time_zone
        await db.flush()
        await db.refresh(existing)
        return existing

    shift_settings = ShiftSettings(
        weekdays=payload.weekdays,
        name=payload.name,
        description=payload.description,
        start_time=payload.start_time,
        end_time=payload.end_time,
        duration_minutes=payload.duration_minutes,
        time_zone=payload.time_zone,
    )
    db.add(shift_settings)
    await db.flush()
    await db.refresh(shift_settings)
    return shift_settings
