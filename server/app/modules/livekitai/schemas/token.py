from pydantic import BaseModel, Field


class GrantToken(BaseModel):
    room_name: str = Field(min_length=1)
    agent_name: str = Field(default="Alexa", min_length=1)
    time_zone: str = Field(default="Asia/Karachi")


class LiveKitTokenResponse(BaseModel):
    token: str
    agent_name: str
    room_name: str
    participant: str
    metadata: dict[str, str]
