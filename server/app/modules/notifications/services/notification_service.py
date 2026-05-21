import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.notifications.models.model import NotificationLog


async def create_notification_log(
    db: AsyncSession,
    booking_id: uuid.UUID,
    user_id: uuid.UUID,
    title: str,
    message: str,
    type: str,
) -> NotificationLog:
    notification = NotificationLog(
        booking_id=booking_id,
        user_id=user_id,
        title=title,
        message=message,
        type=type,
    )
    db.add(notification)
    await db.flush()
    await db.refresh(notification)
    return notification


async def get_notifications_for_user(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> list[NotificationLog]:
    result = await db.execute(
        select(NotificationLog)
        .where(NotificationLog.user_id == user_id)
        .order_by(NotificationLog.created_at.desc())
    )
    return list(result.scalars().all())
