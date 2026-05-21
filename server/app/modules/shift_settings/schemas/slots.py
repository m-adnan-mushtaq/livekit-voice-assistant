from datetime import date
import uuid

from pydantic import BaseModel


class AvailableStaffSlot(BaseModel):
    id: uuid.UUID
    full_name: str


class AvailableSlotResponse(BaseModel):
    date: date
    start_time: str
    end_time: str
    available_staff: list[AvailableStaffSlot]
