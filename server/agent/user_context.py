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


async def user_context_from_job(
    ctx: JobContext,
) -> UserContext:
    try:
        participant = await ctx.wait_for_participant()
        print(f"Participant [Joined Room]: {participant}")
    except Exception as exc:
        raise UserContextError("No remote participant joined room") from exc

    if not participant.metadata:
        raise UserContextError("Participant metadata is missing")

    try:
        metadata = json.loads(participant.metadata)
        print(f"Metadata [Loaded]: {metadata}")
    except json.JSONDecodeError as exc:
        print(f"Error loading metadata: {exc}")
        raise UserContextError("Invalid participant metadata JSON") from exc

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
        if not metadata.get(field)
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
