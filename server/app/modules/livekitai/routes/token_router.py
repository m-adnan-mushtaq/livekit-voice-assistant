from fastapi import APIRouter, Depends, status

from app.modules.auth.middleware import authorize
from app.modules.livekitai.schemas.token import GrantToken
from app.modules.livekitai.services.token_service import generate_livekit_token
from app.modules.user.models.user import User
from app.utils.common import catch_errors, format_response


livekitai_router = APIRouter(
    prefix="/livekitai",
    tags=["LiveKit AI"],
)


@livekitai_router.post("/token")
@catch_errors
async def get_token(
    payload: GrantToken,
    current_user: User = Depends(authorize()),
):
    result = await generate_livekit_token(payload, current_user)
    return format_response(result, status.HTTP_200_OK)
