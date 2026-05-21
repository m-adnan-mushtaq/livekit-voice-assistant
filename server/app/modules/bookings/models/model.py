from datetime import datetime
from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.base_table import BaseTable


class Booking(BaseTable):
    __tablename__ = "bookings"

    # customer booking
    customer_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    # assigned yoga instructor
    staff_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    # example:
    # Online 1:1 Yoga
    session_type: Mapped[str] = mapped_column(
        String,
        nullable=False,
        default="Online 1:1 Yoga"
    )

    # booking timing
    start_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )

    end_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )

    # pending / confirmed / cancelled / completed
    status: Mapped[str] = mapped_column(
        String,
        nullable=False,
        default="pending"
    )

    # collected by alexa voice ai
    yoga_goal: Mapped[str | None] = mapped_column(
        String,
        nullable=True
    )

    experience_level: Mapped[str | None] = mapped_column(
        String,
        nullable=True
    )

    # short ai generated summary
    conversation_summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # cal.com or meeting link
    meeting_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )
