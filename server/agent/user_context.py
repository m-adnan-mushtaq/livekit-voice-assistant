from __future__ import annotations

import json
from typing import TypedDict

from livekit.agents import JobContext


class UserContext(TypedDict):
    user_id: str
    full_name: str
    email: str
    role: str
    time_zone: str


class UserContextError(Exception):
    pass


def user_context_from_job(
    ctx: JobContext,
) -> UserContext:

    try:
        participant = next(
            iter(ctx.room.remote_participants.values())
        )
        print(f"Participant [Joined Room]: {participant}")
    except StopIteration:
        print(f"No remote participant found in room")
        raise UserContextError(
            "No remote participant found in room"
        )

    if not participant.metadata:
        raise UserContextError(
            "Participant metadata is missing"
        )

    try:
        metadata = json.loads(participant.metadata)
    except json.JSONDecodeError as exc:
        raise UserContextError(
            "Invalid participant metadata JSON"
        ) from exc

    required_fields = [
        "user_id",
        "full_name",
        "email",
        "role",
        "time_zone",
    ]

    missing = [
        field
        for field in required_fields
        if field not in metadata
    ]

    if missing:
        raise UserContextError(
            f"Missing metadata fields: {', '.join(missing)}"
        )

    return {
        "user_id": str(metadata["user_id"]),
        "full_name": str(metadata["full_name"]),
        "email": str(metadata["email"]),
        "role": str(metadata["role"]),
        "time_zone": str(metadata.get("time_zone", "Asia/Karachi")),
    }
