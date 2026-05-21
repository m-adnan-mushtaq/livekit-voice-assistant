import inspect
from typing import Any

from fastapi import HTTPException
from livekit.agents import RunContext, function_tool
from livekit.agents.llm import Toolset
from typing_extensions import Self

from app.modules.bookings.services.voice_booking_service import (
    book_voice_session,
    get_voice_available_slots,
    get_voice_user_bookings,
)


async def _generate_tool_reply(context: RunContext, instructions: str) -> None:
    result = context.session.generate_reply(instructions=instructions)
    if inspect.isawaitable(result):
        await result


class YogaToolset(Toolset):
    def __init__(self, user_context: dict[str, Any]):
        super().__init__(id="yoga_tools")
        self.user_context = user_context
        self.user_id = str(user_context["user_id"])

        self.get_user_booked_yoga_sessions = function_tool(
            self._get_user_booked_yoga_sessions,
            name="get_user_booked_yoga_sessions",
            description="Get upcoming yoga bookings for the authenticated customer. No inputs.",
        )
        self.book_yoga_session = function_tool(
            self._book_yoga_session,
            name="book_yoga_session",
            description="Book a yoga session for the authenticated customer using a backend-returned staff_id and slot times.",
        )
        self.get_available_yoga_slots = function_tool(
            self._get_available_yoga_slots,
            name="get_available_yoga_slots",
            description="Get available yoga slots from the backend for an inclusive date range.",
        )
        self._tools = [
            self.get_user_booked_yoga_sessions,
            self.book_yoga_session,
            self.get_available_yoga_slots,
        ]

    async def setup(self) -> Self:
        print("Yoga Toolset setup started")
        await super().setup()
        print("Yoga Toolset setup")
        return self

    async def aclose(self) -> None:
        await super().aclose()

    async def _get_user_booked_yoga_sessions(self, context: RunContext) -> dict[str, Any]:
        await _generate_tool_reply(context, "Checking your upcoming yoga sessions.")
        try:
            return await get_voice_user_bookings(self.user_id)
        except Exception:
            return {
                "success": False,
                "message": "I could not check your upcoming sessions right now.",
            }

    async def _book_yoga_session(
        self,
        context: RunContext,
        staff_id: str,
        start_time: str,
        end_time: str,
        yoga_goal: str | None = None,
        experience_level: str | None = None,
    ) -> dict[str, Any]:
        await _generate_tool_reply(context, "Booking that yoga session now.")

        try:
            return await book_voice_session(
                user_id=self.user_id,
                staff_id=staff_id,
                start_time=start_time,
                end_time=end_time,
                yoga_goal=yoga_goal,
                experience_level=experience_level,
            )
        except ValueError:
            return {
                "success": False,
                "message": "The selected booking details were invalid.",
            }
        except HTTPException as exc:
            return {"success": False, "message": exc.detail}
        except Exception:
            return {"success": False, "message": "I could not book that yoga session right now."}

    async def _get_available_yoga_slots(
        self,
        context: RunContext,
        start_date: str,
        end_date: str,
    ) -> list[dict[str, Any]] | dict[str, Any]:
        await _generate_tool_reply(context, "Checking available yoga slots.")

        try:
            return await get_voice_available_slots(start_date, end_date)
        except ValueError:
            return {"success": False, "message": "The date range was invalid. Use YYYY-MM-DD dates."}
        except HTTPException as exc:
            return {"success": False, "message": exc.detail}
        except Exception:
            return {"success": False, "message": "I could not check availability right now."}
