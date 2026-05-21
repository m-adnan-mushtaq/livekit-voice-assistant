from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, ARRAY, Time, Integer, Text
from app.core.base_table import BaseTable
from datetime import time


class ShiftSettings(BaseTable):
    __tablename__ = 'shift_settings'

    # Make sure these imports are present

    weekdays: Mapped[list[int]] = mapped_column(
        ARRAY(Integer),
        nullable=False,
    )

    name: Mapped[str | None] = mapped_column(String, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    start_time: Mapped[time] = mapped_column(Time, nullable=False)
    end_time: Mapped[time] = mapped_column(Time, nullable=False)
    duration_minutes: Mapped[int] = mapped_column(
        Integer, nullable=False, default=30)

    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False)
