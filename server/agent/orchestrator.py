from livekit.agents import Agent
from agent.prompts import SYSTEM_PROMPT
from agent.tools import YogaToolset


class BasicAssistant(Agent):
    """Voice assistant scoped to authenticated yoga booking."""

    def __init__(self, user_context: dict) -> None:
        print("Creating Yoga Assistant")
        super().__init__(
            instructions=SYSTEM_PROMPT,
            tools=[YogaToolset(user_context)],
        )
