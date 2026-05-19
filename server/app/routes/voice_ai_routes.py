from fastapi import APIRouter, Body
from app.schemas.ai import GrantToken
from config.settings import settings

from livekit.api import (
    AccessToken,
    VideoGrants,
    LiveKitAPI,
)

from livekit.protocol.agent_dispatch import CreateAgentDispatchRequest

router = APIRouter()


@router.post('/token')
async def get_token(payload: GrantToken):
    # Generate user token
    token = AccessToken(
        api_key=settings.LIVEKIT_API_KEY,
        api_secret=settings.LIVEKIT_API_SECRET,
    )

    token.with_identity(payload.participant)

    token.with_grants(
        VideoGrants(
            room_join=True,
            room=payload.room_name,
            can_publish=True,
            can_subscribe=True,
        )
    )

    lkapi = LiveKitAPI()

    await lkapi.agent_dispatch.create_dispatch(
        CreateAgentDispatchRequest(
            agent_name=payload.agent_name,
            room=payload.room_name,
        )
    )

    return {
        "token": token.to_jwt(),
        "agent_name": payload.agent_name,
        "room_name": payload.room_name,
        "participant": payload.participant,
    }
