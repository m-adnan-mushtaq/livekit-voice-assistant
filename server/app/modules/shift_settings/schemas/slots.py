from datetime import date, time
import uuid

from pydantic import BaseModel, Field


class AvailableStaffSlot(BaseModel):
    id: uuid.UUID
    full_name: str


class AvailableSlotResponse(BaseModel):
    date: date
    start_time: str
    end_time: str
    available_staff: list[AvailableStaffSlot]


class CreateShiftSettings(BaseModel):
    weekdays: list[int]
    name: str
    description: str
    start_time: time
    end_time: time
    duration_minutes: int
    time_zone: str = Field(default="Asia/Karachi")
