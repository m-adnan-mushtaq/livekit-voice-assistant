import inspect
from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo

from fastapi import HTTPException
from livekit.agents import RunContext, function_tool
from livekit.agents.llm import Toolset
from typing_extensions import Self

from app.modules.bookings.services.voice_booking_service import (
    book_voice_session,
    get_voice_available_slots,
    get_voice_user_bookings,
)
from app.modules.user.services.user_service import get_staff_list

import asyncio


async def _generate_tool_reply(context: RunContext, instructions: str) -> None:
    result = context.session.generate_reply(instructions=instructions)
    if inspect.isawaitable(result):
        await result


class YogaToolset(Toolset):
    def __init__(self, user_context: dict[str, Any]):
        super().__init__(id="yoga_tools")
        self.user_context = user_context
        self.user_id = str(user_context["user_id"])
        self.time_zone = str(user_context.get("time_zone", "Asia/Karachi"))

        self.get_user_booked_yoga_sessions = function_tool(
            self._get_user_booked_yoga_sessions,
            name="get_user_booked_yoga_sessions",
            description="Get upcoming yoga bookings for the authenticated customer. No inputs.",
        )
        self.book_yoga_session = function_tool(
            self._book_yoga_session,
            name="book_yoga_session",
            description=(
                "Book a yoga session. Pass exactly: staff_id (UUID string), "
                "booking_date (YYYY-MM-DD), start_time (HH:MM, e.g. '14:00'), "
                "end_time (HH:MM, e.g. '14:30'). All values come from get_available_yoga_slots results."
            ),
        )
        self.get_available_yoga_slots = function_tool(
            self._get_available_yoga_slots,
            name="get_available_yoga_slots",
            description="Get available yoga slots from the backend for an inclusive date range.",
        )
        self.get_staff_list = function_tool(
            self._get_staff_list,
            name="get_staff_list",
            description="Get list of available staff members.",
        )
        self.get_current_time = function_tool(
            self._get_current_time,
            name="get_current_time",
            description=(
                "Get the current date and time in the user's timezone. "
                "Use this to resolve 'today', 'tomorrow', 'this week', etc."
            ),
        )
        self._tools = [
            self.get_user_booked_yoga_sessions,
            self.book_yoga_session,
            self.get_available_yoga_slots,
            self.get_staff_list,
            self.get_current_time,
        ]

    async def setup(self) -> Self:
        await super().setup()
        return self

    async def aclose(self) -> None:
        await super().aclose()

    async def _get_current_time(self, context: RunContext) -> dict[str, str]:
        tz = ZoneInfo(self.time_zone)
        now = datetime.now(tz)
        return {
            "date": now.strftime("%Y-%m-%d"),
            "time": now.strftime("%H:%M"),
            "day_name": now.strftime("%A"),
            "time_zone": self.time_zone,
        }

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
        booking_date: str,
        start_time: str,
        end_time: str,
        yoga_goal: str | None = None,
        experience_level: str | None = None,
    ) -> dict[str, Any]:
        # await _generate_tool_reply(context, "Booking that yoga session now.")

        try:
            return await book_voice_session(
                user_id=self.user_id,
                staff_id=staff_id,
                booking_date=booking_date,
                start_time=start_time,
                end_time=end_time,
                time_zone=self.time_zone,
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

    async def _get_staff_list(self, context: RunContext) -> list[dict[str, Any]]:
        await _generate_tool_reply(context, "Checking available staff members.")
        try:
            return await get_staff_list()
        except Exception:
            return {"success": False, "message": "I could not check availability right now."}


# Quick testing
if __name__ == "__main__":
    async def test():
        user_context = {
            "user_id": "37803cc2-cc90-4920-b990-292c07fb4098",
            "full_name": "Kai Castro",
            "email": "vyxabylof@mailinator.com",
            "role": "client",
            "time_zone": "Asia/Karachi",
        }
        toolset = YogaToolset(user_context)
        print(await toolset.book_yoga_session(
            staff_id="68a8ee51-1e8c-4634-bccd-9b0edd7fcff1",
            start_time="14:00",
            end_time="14:30",
            yoga_goal="Weight loss",
            experience_level="Beginner",
            booking_date="2026-05-22",
            context=None,
        ))

    asyncio.run(test())
