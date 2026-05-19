from livekit.agents import Agent, RunContext, function_tool
from livekit.agents.llm import Toolset
from typing_extensions import Self
from agent.services.meeting import CalService
import datetime


class YogaToolset(Toolset):
    def __init__(self):
        super().__init__(id="yoga_tools")

        self.get_user_booked_yoga_sessions = function_tool(
            self._get_user_booked_yoga_sessions,
            name="get_user_booked_yoga_sessions",
            description="Look up user's booked yoga sessions by providing the email.",
        )
        self.book_yoga_session = function_tool(
            self._book_yoga_session,
            name="book_yoga_session",
            description="Book a yoga session by providing the start time, name, and email.",
        )
        self.get_available_yoga_slots = function_tool(
            self._get_available_yoga_slots,
            name="get_available_yoga_slots",
            description="Get available yoga slots by providing the start and end dates.",
        )
        self.get_current_time = function_tool(
            self._get_current_time,
            name="get_current_time",
            description="Get the current time.",
        )
        self._tools = [
            self.get_user_booked_yoga_sessions,
            self.book_yoga_session,
            self.get_available_yoga_slots,
            self.get_current_time,
        ]

    async def setup(self) -> Self:
        print("Yoga Toolset setup started")
        await super().setup()
        print("Yoga Toolset setup")
        # initialize external connections, load config, etc.
        return self

    async def aclose(self) -> None:
        await super().aclose()
        # close connections, release resources

    async def _get_user_booked_yoga_sessions(self, context: RunContext, email: str) -> str:

        context.session.generate_reply(
            instructions=f"Getting user's booked yoga sessions... for email: {email}")
        slots = CalService.get_booked_meetings_by_email(email)
        if slots:
            return f"User has booked yoga sessions: {slots}"
        else:
            return f"User has no booked yoga sessions."

    async def _book_yoga_session(self, context: RunContext, start: str, name: str, email: str) -> str:
        print(f"Booking yoga session... for email: {email}")
        context.session.generate_reply(
            instructions=f"Booking yoga session... for email: {email}")
        booking = CalService.create_booking(start, name, email)
        if booking:
            return f"Yoga session booked successfully: {booking}"
        else:
            return f"Yoga session booking failed."

    async def _get_available_yoga_slots(self, context: RunContext, start: str, end: str) -> str:
        context.session.generate_reply(
            instructions=f"Getting available yoga slots... for start: {start} and end: {end}")
        slots = CalService.get_available_slots(start, end)
        if slots:
            return f"Available yoga slots: {slots}"
        else:
            return f"No available yoga slots."

    async def _get_current_time(self) -> str:
        """Get the current time."""
        return datetime.datetime.now().isoformat()
