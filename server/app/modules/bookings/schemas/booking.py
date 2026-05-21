from datetime import datetime
from typing import Optional
import uuid

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class BookingCreate(BaseModel):
    customer_id: uuid.UUID
    staff_id: uuid.UUID
    session_type: str = "Online 1:1 Yoga"
    start_time: datetime
    end_time: datetime
    yoga_goal: Optional[str] = None
    experience_level: Optional[str] = None
    conversation_summary: Optional[str] = None

    @field_validator("start_time", "end_time")
    @classmethod
    def require_timezone(cls, value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("Datetime must be timezone-aware")
        return value

    @model_validator(mode="after")
    def validate_time_order(self):
        if self.end_time <= self.start_time:
            raise ValueError("end_time must be after start_time")
        return self


class BookingCreateRequest(BaseModel):
    staff_id: uuid.UUID
    session_type: str = "Online 1:1 Yoga"
    start_time: datetime
    end_time: datetime
    yoga_goal: Optional[str] = None
    experience_level: Optional[str] = None
    conversation_summary: Optional[str] = None

    @field_validator("start_time", "end_time")
    @classmethod
    def require_timezone(cls, value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("Datetime must be timezone-aware")
        return value

    @model_validator(mode="after")
    def validate_time_order(self):
        if self.end_time <= self.start_time:
            raise ValueError("end_time must be after start_time")
        return self


class BookingDecision(BaseModel):
    reason: Optional[str] = None


class BookingResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    customer_id: uuid.UUID
    staff_id: uuid.UUID
    session_type: str
    start_time: datetime
    end_time: datetime
    status: str
    yoga_goal: Optional[str] = None
    experience_level: Optional[str] = None
    conversation_summary: Optional[str] = None
    meeting_url: Optional[str] = None


class BookingUserInfo(BaseModel):
    id: uuid.UUID
    full_name: str
    email: str


class BookingCalendarResponse(BaseModel):
    id: uuid.UUID
    customer: BookingUserInfo
    staff: BookingUserInfo
    start_time: datetime
    end_time: datetime
    status: str
    session_type: str
