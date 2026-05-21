from __future__ import annotations

import json
from typing import Any


def build_livekit_user_metadata(user: Any) -> str:
    return json.dumps(
        {
            "user_id": str(user.id),
            "full_name": user.name,
            "email": user.email,
            "role": "customer",
        }
    )


def apply_metadata_to_token(access_token: Any, user: Any) -> Any:
    access_token.with_metadata(build_livekit_user_metadata(user))
    return access_token
