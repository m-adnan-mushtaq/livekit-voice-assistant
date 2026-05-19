# minimal_agent.py
from __future__ import annotations

import asyncio
import os
from dotenv import load_dotenv

from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli, AutoSubscribe
from livekit.plugins import deepgram, openai, silero

from fastapi import FastAPI

from livekit.api import VideoGrants
from livekit.api import AccessToken
import uvicorn

load_dotenv()


class BasicAssistant(Agent):
    """A very basic voice assistant."""

    def __init__(self) -> None:
        print("Creating Basic Assistant")
        super().__init__(
            instructions="""
            You are a friendly voice assistant named Alexa.
            Answer the user's questions concisely.
            If the user says 'okay alexa exit', you should respond with a goodbye message and end the call.
            """,
        )


async def entrypoint(ctx: JobContext):
    """This function is called when a new session starts."""
    print("ENTRYPOINT STARTED")

    await ctx.connect(
        auto_subscribe=AutoSubscribe.AUDIO_ONLY
    )

    print(f"ROOM: {ctx.room}")

    print(f"CONNECTED TO ROOM: {ctx.room.name}")

    session = AgentSession(
        vad=silero.VAD.load(),
        stt=deepgram.STT(),
        llm=openai.LLM(),
        tts=deepgram.TTS(),
    )

    agent = BasicAssistant()

    await session.start(
        room=ctx.room,
        agent=agent,
    )

    await session.generate_reply(
        instructions="Greet the user and offer your assistance."
    )

    print("SESSION STARTED")


if __name__ == "__main__":
    print("Starting Basic Assistant")
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, agent_name='Alexa'))
