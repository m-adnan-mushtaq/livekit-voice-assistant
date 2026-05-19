# minimal_agent.py
from __future__ import annotations

from dotenv import load_dotenv

from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli, AutoSubscribe
from livekit.plugins import deepgram, openai, silero

from agent.orchestrator import BasicAssistant
from config.settings import settings

load_dotenv()


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
        llm=openai.LLM.with_openrouter(
            model=settings.OPENROUTER_MODEL,
            api_key=settings.OPENROUTER_API_KEY,
        ),
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
