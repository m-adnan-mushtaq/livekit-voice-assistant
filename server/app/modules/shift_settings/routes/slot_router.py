from datetime import date, datetime

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession as Session

from app.core.database import get_db
from app.modules.auth.middleware.auth import authorize
from app.modules.shift_settings.schemas.slots import CreateShiftSettings
from app.modules.shift_settings.services import slot_service
from app.modules.user.models.user import User
from app.modules.user.schemas.user import Role
from app.utils.common import catch_errors, format_response

slot_router = APIRouter(
    prefix="/shift-settings",
    tags=["Shift Settings"],
)


@slot_router.get("/available-slots")
@catch_errors
async def available_slots(
    start_date: datetime = Query(...,
                                 description="Start date in YYYY-MM-DD HH:MM:SS format"),
    end_date: datetime = Query(...,
                               description="End date in YYYY-MM-DD HH:MM:SS format"),
    db: Session = Depends(get_db),
):
    result = await slot_service.get_available_slots(db, start_date, end_date)
    return format_response(result, status.HTTP_200_OK)


@slot_router.get("/")
@catch_errors
async def get_shift_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize(Role.ADMIN.value)),
):
    result = await slot_service.get_active_shift_settings(db)
    return format_response(result, status.HTTP_200_OK)


@slot_router.post("/")
@catch_errors
async def upsert_shift_settings(
    payload: CreateShiftSettings,
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize(Role.ADMIN.value)),
):
    result = await slot_service.create_or_update_shift_settings(db, payload)
    await db.commit()
    return format_response(result, status.HTTP_200_OK)
