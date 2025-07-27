import logging
import os
from typing import List

from livekit import api
from livekit.agents import function_tool
from dotenv import load_dotenv
import aiohttp

logger = logging.getLogger(__name__)

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL")


class ToolSetup:
    """Class to handle tool setup for the voice agent."""

    def __init__(self, room_name: str = None):
        self.name = "ToolSetup"
        self.livekit_url = os.getenv("LIVEKIT_URL")
        self.livekit_api_key = os.getenv("LIVEKIT_API_KEY")
        self.livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")
        self.room_name = room_name

        if not all([self.livekit_url, self.livekit_api_key, self.livekit_api_secret]):
            logger.warning("One or more LiveKit environment variables are not set.")

    def create_end_call_tool(self):
        """Create the end call tool."""

        async def end_call(room_name: str):
            """End the specified call."""
            if not room_name:
                logger.error("Room name not provided")
                return "Failed: Room name not provided"

            client = api.LiveKitAPI(
                self.livekit_url, self.livekit_api_key, self.livekit_api_secret
            )
            try:
                await client.room.remove_participant(
                    api.RoomParticipantIdentity(
                        room=self.room_name,
                        identity="user"
                    )
                )
                await client.aclose()
                return "Call ended successfully"
            except Exception as e:
                logger.error(f"Failed to end call: {e}")
                return f"Failed to end call: {str(e)}"

        return function_tool(
            end_call,
            name="end_call",
            description="Use this when user says bye or wants to end the call"
        )

    def create_api_tool(self, endpoint: str, name: str, description: str):
        """Create a generic tool to call a specific API."""

        async def api_call():
            try:
                url = f"{BACKEND_URL}{endpoint}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url) as response:
                        data = await response.json()
                        return f"{data} use this as string and dont say any thing like ## etc"
            except Exception as e:
                logger.error(f"Failed to fetch from {endpoint}: {e}")
                return f"Failed to fetch data: {str(e)}"

        return function_tool(
            api_call,
            name=name,
            description=f"{description}"
        )

    def setup_tools(self) -> List:
        """Set up all tools and return them as a list."""
        tools = [
            self.create_end_call_tool(),
            self.create_api_tool(
                "/blogs/?page=1",
                name="get_latest_blogs",
                description="Use whenever someone asks for what are you doing use ask about blogs waht you learned etc types things"
            ),
            self.create_api_tool(
                "/about/skills/",
                name="get_skills",
                description="Use whenever someone asks about your skills"
            ),
            self.create_api_tool(
                "/about/achievements/",
                name="get_achievements",
                description="Use whenever someone asks about your achievements"
            ),
            self.create_api_tool(
                "/about/certifications/",
                name="get_certifications",
                description="Use whenever someone asks about your certifications"
            ),
            self.create_api_tool(
                "/about/experiences/",
                name="get_experiences",
                description="Use whenever someone asks about your work or project experience"
            ),
            self.create_api_tool(
                "/about/projects/",
                name="get_projects",
                description="Use whenever someone asks about your projects"
            )
        ]

        logger.info(f"Tools set up: {len(tools)} tools created {tools}")
        return tools
