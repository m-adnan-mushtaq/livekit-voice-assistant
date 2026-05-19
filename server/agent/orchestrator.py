from livekit.agents import Agent
from agent.prompts import SYSTEM_PROMPT
from agent.tools import YogaToolset


class BasicAssistant(Agent):
    """A very basic voice assistant."""

    def __init__(self) -> None:
        print("Creating Yoga Assistant")
        super().__init__(
            instructions=SYSTEM_PROMPT,
            tools=[YogaToolset()],
        ),
