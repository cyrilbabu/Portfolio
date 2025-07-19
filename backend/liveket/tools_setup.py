import logging
from typing import List

from livekit import api
from livekit.agents import function_tool

logger = logging.getLogger(__name__)


class ToolSetup:
    """Class to handle tool setup for the voice agent."""

    def __init__(self):


    def create_rag_tool(self, description: str):
        """Create a tool for RAG functionality."""

        async def enrich_with_rag(question_for_knowledge_base: str):
            """Query knowledge base and enrich context with relevant information."""
            await self.ph.initialize()
            result = await self.ph.get_document_from_pinecone(
                question_for_knowledge_base,
                knowledge_base_id=self.knowledge_base_id,
            )

            if result:
                return result
            return "No relevant information found in knowledge base"

        if self.knowledge_base_id and self.knowledge_base_description:
            return function_tool(
                enrich_with_rag,
                name="enrich_with_rag",
                description=f"Called when you need to enrich with RAG for questions about {description}. Call the function only when you need to.",
            )
        return None

 
  

    def setup_tools(self) -> List:
        """Set up all tools and return them as a list."""
        tools = []

        for api_action in self.api_actions:
            tools.append(self.create_api_tool(api_action))

        for builtin in self.builtin_functions:
            if builtin.function_name == "end_call":
                tools.append(self.create_end_call_tool(builtin.description))
            if builtin.function_name == "whatsapp_message":
                tools.append(self.create_whatsapp_message_tool(builtin.description))

        if self.knowledge_base_id:
            tools.append(self.create_rag_tool(self.knowledge_base_description))

        if self.call_details.voicebot.cal:
            tools.append(
                self.create_booking_tool(
                    event_type_id=self.cal_event_type_id,
                    time_zone=self.cal_time_zone,
                )
            )

            # Add available slots tool
            tools.append(
                self.create_available_slots_tool(
                    api_key=self.cal_api_key,
                    event_type_duration=self.cal_event_type_duration,
                    timezone=self.cal_time_zone,
                    schedule_id=self.cal_schedule_id,
                )
            )

        logger.info(f"Tools set up: {len(tools)} tools created {tools}")
        return tools
