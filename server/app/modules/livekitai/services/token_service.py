from __future__ import annotations

import json

from livekit.api import (
    AccessToken,
    VideoGrants,
)

from app.core.config_loader import settings
from app.modules.livekitai.schemas.token import GrantToken
from app.modules.user.models.user import User
from agent.user_context import UserContext


async def generate_livekit_token(
    payload: GrantToken,
    current_user: User,
) -> dict:

    metadata: UserContext = {
        "user_id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,
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

    return {
        "token": token.to_jwt(),
        "room_name": payload.room_name,
        "agent_name": payload.agent_name,
        "metadata": metadata,
    }
