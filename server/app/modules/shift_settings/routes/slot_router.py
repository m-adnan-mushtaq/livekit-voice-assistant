from datetime import date

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession as Session

from app.core.database import get_db
from app.modules.shift_settings.services.slot_service import get_available_slots
from app.utils.common import catch_errors, format_response


slot_router = APIRouter(
    prefix="/shift-settings",
    tags=["Shift Settings"],
)


@slot_router.get("/available-slots")
@catch_errors
async def available_slots(
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: Session = Depends(get_db),
):
    result = await get_available_slots(db, start_date, end_date)
    return format_response(result, status.HTTP_200_OK)
