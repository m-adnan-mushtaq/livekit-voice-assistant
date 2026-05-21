from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession as Session

from app.core.database import get_db
from app.modules.auth.middleware import authorize
from app.modules.notifications.services.notification_service import get_notifications_for_user
from app.modules.user.models.user import User
from app.utils.common import catch_errors, format_response


notification_router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@notification_router.get("/")
@catch_errors
async def notification_list(
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize()),
):
    results = await get_notifications_for_user(db, current_user.id)
    return format_response(results, status.HTTP_200_OK)
