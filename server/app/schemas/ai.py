from pydantic import BaseModel


class GrantToken(BaseModel):
    room_name: str
    participant: str
    agent_name: str
