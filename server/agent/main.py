# minimal_agent.py
from __future__ import annotations

from dotenv import load_dotenv

from livekit.agents import Agent, AgentSession, ConversationItemAddedEvent, JobContext, UserInputTranscribedEvent, WorkerOptions, cli, AutoSubscribe
from livekit.plugins import deepgram, openai, silero

from agent.orchestrator import BasicAssistant
from agent.user_context import UserContextError, user_context_from_job
from config.settings import settings

load_dotenv(override=True)


async def entrypoint(ctx: JobContext):
    """This function is called when a new session starts."""
    print("ENTRYPOINT STARTED")

    await ctx.connect(
        auto_subscribe=AutoSubscribe.AUDIO_ONLY
    )

    print(f"ROOM: {ctx.room}")

    print(f"CONNECTED TO ROOM: {ctx.room.name}")
    user_name = ''
    try:
        user_context = await user_context_from_job(ctx)
        user_name = user_context["full_name"]
    except UserContextError as exc:
        print(f"Invalid LiveKit user metadata: {exc}")
        return

    session = AgentSession(
        vad=silero.VAD.load(),
        stt=deepgram.STT(),
        llm=openai.LLM.with_openrouter(
            model=settings.OPENROUTER_MODEL,
            api_key=settings.OPENROUTER_API_KEY,
        ),
        tts=deepgram.TTS(),
    )

    agent = BasicAssistant(user_context)

    await session.start(
        room=ctx.room,
        agent=agent,
    )

    await session.generate_reply(
        instructions=f"Greet the user named '{user_name}' by name and ask how you can help with yoga bookings."
    )

    print("SESSION STARTED")

    @session.on("user_input_transcribed")
    def on_user_input_transcribed(event: UserInputTranscribedEvent):
        print(f"User input transcribed: {event.transcript}")

    @session.on("conversation_item_added")
    def on_conversation_item_added(event: ConversationItemAddedEvent):
        print(f"Conversation item added: {event.item}")


if __name__ == "__main__":
    print("Starting Basic Assistant")
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, agent_name='Alexa'))
