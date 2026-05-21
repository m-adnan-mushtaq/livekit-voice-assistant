from datetime import date
import uuid

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession as Session

from app.core.database import get_db
from app.modules.auth.middleware import authorize
from app.modules.bookings.schemas.booking import BookingCreateRequest, BookingDecision
from app.modules.bookings.services.booking_service import (
    approve_booking,
    create_booking_for_user,
    list_bookings,
    reject_booking,
)
from app.modules.user.models.user import User
from app.utils.common import catch_errors, format_response


booking_router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)


@booking_router.post("/")
@catch_errors
async def booking_create(
    payload: BookingCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize()),
):
    result = await create_booking_for_user(db, current_user, payload)
    return format_response(result, status.HTTP_201_CREATED)


@booking_router.get("/")
@catch_errors
async def booking_list(
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    upcoming_only: bool = Query(False),
    status_filter: str | None = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize()),
):
    result = await list_bookings(db, current_user, start_date, end_date, upcoming_only, status_filter)
    return format_response(result, status.HTTP_200_OK)


@booking_router.post("/{booking_id}/approve")
@catch_errors
async def booking_approve(
    booking_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize()),
):
    result = await approve_booking(db, booking_id, current_user)
    return format_response(result, status.HTTP_200_OK)


@booking_router.post("/{booking_id}/reject")
@catch_errors
async def booking_reject(
    booking_id: uuid.UUID,
    payload: BookingDecision,
    db: Session = Depends(get_db),
    current_user: User = Depends(authorize()),
):
    result = await reject_booking(db, booking_id, current_user, payload.reason)
    return format_response(result, status.HTTP_200_OK)
