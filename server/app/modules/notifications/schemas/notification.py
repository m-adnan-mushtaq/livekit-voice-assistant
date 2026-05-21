from datetime import datetime
import uuid

from pydantic import BaseModel, ConfigDict


class NotificationLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    booking_id: uuid.UUID
    user_id: uuid.UUID
    title: str
    message: str
    type: str
    created_at: datetime
