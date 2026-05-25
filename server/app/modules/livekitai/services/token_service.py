from __future__ import annotations

import json

from livekit.api import (
    AccessToken,
    VideoGrants,
    LiveKitAPI,
)

from app.core.config_loader import settings
from app.modules.livekitai.schemas.token import GrantToken
from app.modules.user.models.user import User
from agent.user_context import UserContext
from livekit.protocol.agent_dispatch import CreateAgentDispatchRequest
from fastapi import HTTPException


async def generate_livekit_token(
    payload: GrantToken,
    current_user: User,
) -> dict:

    metadata: UserContext = {
        "user_id": str(current_user.id),
        "full_name": current_user.name,
        "email": current_user.email,
        "role": current_user.role.name,
        "time_zone": payload.time_zone,
    }

    token = AccessToken(
        api_key=settings.LIVEKIT_API_KEY,
        api_secret=settings.LIVEKIT_API_SECRET,
    )

    token.with_identity(str(current_user.id))

    token.with_metadata(
        json.dumps(metadata)
    )

    token.with_grants(
        VideoGrants(
            room_join=True,
            room=payload.room_name,
            can_publish=True,
            can_subscribe=True,
        )
    )
    lkapi = LiveKitAPI()

    try:
        await lkapi.agent_dispatch.create_dispatch(
            CreateAgentDispatchRequest(
                agent_name=payload.agent_name,
                room=payload.room_name,
                metadata=json.dumps(metadata),
            )
        )
    except Exception as exc:
        print(f"Error creating dispatch: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        await lkapi.aclose()
        print("LKAPI CLOSED")

    return {
        "token": token.to_jwt(),
        "room_name": payload.room_name,
        "agent_name": payload.agent_name,
        "metadata": metadata,
    }
