# services/cal_service.py

from __future__ import annotations

import requests
from config.settings import settings


class CalService:
    BASE_URL = "https://api.cal.com/v2"
    API_KEY = settings.CAL_API_KEY
    EVENT_TYPE_ID = 5740698

    SLOTS_VERSION = "2024-09-04"
    BOOKINGS_VERSION = "2026-05-01"
    CREATE_BOOKING_VERSION = "2026-02-25"

    @staticmethod
    def headers(version: str) -> dict:
        return {
            "Authorization": f"Bearer {CalService.API_KEY}",
            "Content-Type": "application/json",
            "cal-api-version": version,
        }

    @staticmethod
    def get_available_slots(
        start: str,
        end: str,
        time_zone: str = "Asia/Karachi",
    ) -> list:
        """
        Get available 30-minute slots.

        Example:
        start = "2026-05-20"
        end = "2026-05-27"
        """

        url = f"{CalService.BASE_URL}/slots"

        params = {
            "eventTypeId": CalService.EVENT_TYPE_ID,
            "start": start,
            "end": end,
            "timeZone": time_zone,
            "duration": 30,
            "format": "range",
        }

        res = requests.get(
            url,
            headers=CalService.headers(CalService.SLOTS_VERSION),
            params=params,
            timeout=20,
        )

        res.raise_for_status()
        data = res.json().get("data", {})

        meetings = []

        for date, slots in data.items():
            for slot in slots:
                meetings.append(
                    {
                        "date": date,
                        "start": slot.get("start"),
                        "end": slot.get("end"),
                        "available": True,
                    }
                )

        return meetings

    @staticmethod
    def get_booked_meetings_by_email(
        email: str,
    ) -> list:
        """
        Get upcoming booked meetings by attendee email.
        """

        url = f"{CalService.BASE_URL}/bookings"

        params = {
            "attendeeEmail": email,
            "status": "upcoming",
            "limit": 20,
            "sortStart": "asc",
            "eventTypeId": CalService.EVENT_TYPE_ID,
        }

        res = requests.get(
            url,
            headers=CalService.headers(CalService.BOOKINGS_VERSION),
            params=params,
            timeout=20,
        )

        res.raise_for_status()
        data = res.json().get("data", [])

        meetings = []

        for booking in data:
            meetings.append(
                {
                    "id": booking.get("id"),
                    "uid": booking.get("uid"),
                    "title": booking.get("title"),
                    "start": booking.get("start"),
                    "end": booking.get("end"),
                    "status": booking.get("status"),
                    "eventTypeId": booking.get("eventTypeId"),
                }
            )

        return meetings

    @staticmethod
    def create_booking(
        start: str,
        name: str,
        email: str,
        time_zone: str = "Asia/Karachi",
    ) -> dict:
        """
        Create a simple 30-minute booking.

        start must be ISO UTC, for example:
        "2026-05-20T09:00:00Z"
        """
        try:

            print(f"Creating booking: {start}, {name}, {email}, {time_zone}")

            url = f"{CalService.BASE_URL}/bookings"

            payload = {
                "eventTypeId": CalService.EVENT_TYPE_ID,
                "start": start,
                "attendee": {
                    "name": name,
                    "email": email,
                    "timeZone": time_zone,
                    "language": "en",
                },
            }

            res = requests.post(
                url,
                headers=CalService.headers(CalService.CREATE_BOOKING_VERSION),
                json=payload,
                timeout=20,
            )
            # res.raise_for_status()
            booking = res.json().get("data", res.json())

            return {
                "id": booking.get("id"),
                "uid": booking.get("uid"),
                "title": booking.get("title"),
                "start": booking.get("start"),
                "end": booking.get("end"),
                "status": booking.get("status"),
                "eventTypeId": booking.get("eventTypeId"),
                "meeting_url": booking.get("meetingUrl"),
                "video_call_url": booking.get("videoCallUrl"),
                "location": booking.get("location"),
            }
        except Exception as e:
            print(f"Error creating booking: {e}")
            return None


# Quick Senity Testing
# if __name__ == "__main__":
    # pass
    # print(CalService.get_available_slots(
    #     start="2024-05-19",
    #     end="2024-05-19",
    # ))

    # print(CalService.create_booking(
    #     start="2026-05-19T16:30:00.000+05:00",
    #     name="Adnan",
    #     email="Adnan@email.com",
    # ))
