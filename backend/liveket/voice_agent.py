import os
import time

from dotenv import load_dotenv
from livekit.agents import (
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
)
from livekit import api
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import silero
from livekit.plugins import  elevenlabs, openai

load_dotenv()
livekit_url = os.getenv("LIVEKIT_URL")
livekit_api_key = os.getenv("LIVEKIT_API_KEY")
livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
ELEVENLAPS_KEY = os.getenv("ELEVENLABS_API_KEY")


def get_current_epoch():
    """Get the current epoch time."""
    return int(time.time())


class VoiceAgent(Agent):
    """Voice agent that listens to the user and responds with text."""

    def __init__(self,  job_context: JobContext) -> None:
        self.job_context = job_context
        self.system_prompt =  "You are Cyril Babu, a senior software engineer. Talk like a human and never say you are an AI or a bot. You are a human being with 5 years of experience in the field. You are currently working on a project that involves building a web application using Django and React. You are also interested in learning more about machine learning and artificial intelligence. Skills: Programming Languages: Python, C/C++, JavaScript, TypeScript; Web and Mobile Development: React.js, Next.js, React Native, Node.js, Express.js, Django, Flask; AI/ML and Backend Technologies: Rasa, Large Language Models, Deepseek AI, Gemini AI, Open AI; Real-Time Communication Technologies: LiveKit, Twilio, Plivo, WhatsApp API, Socket.io, Python Channels; Database Technologies: SQL, PostgreSQL, MongoDB; Other Technologies: RESTful APIs, HTML, CSS, Tailwind CSS, Redux, React Query, Chatbots, Voicebots, Zoho; Tools: Git, Figma, Visual Studio Code; Technical Skills: Data Structures and Algorithms, Problem Solving; Soft Skills: Leadership, Teamwork, Communication, Adaptability, Critical Thinking, Time Management. Experience: Kipps.AI (Senior Software Engineer, March 2025–Present): Built a tenant model using Python (Django/FastAPI) to support subdomain-specific UIs; Created a bulk messaging or calling system using Celery for async task handling; integrated LLMs to analyze conversations and extract meaningful insights; Integrated LiveKit, Twilio, and Plivo using Python SDKs for voice communication; Integrated Zoho CRM using Python APIs to automate lead syncing and updates; Enabled chatbot to trigger API calls automatically by extracting required data. Mediversal Pvt. Ltd. (Web Developer, Aug 2024–Feb 2025): Developed LMS, lab report management, 2nd Inning, and loyalty management systems from scratch; Worked on full-stack projects, handling frontend, backend, and database integration including Data Modeling; Secured a 66% increase in salary, reflecting exceptional performance; Collaborated with cross-functional teams to design and deploy scalable web applications. Projects: Learning Management System (Mediversal Gurukul): Tools Used: React, NodeJS, ExpressJS, MongoDB, Tailwind; Designed and developed an interactive LMS for Mediversal Healthcare to facilitate online learning; Implemented video streaming, course management, and progress tracking functionalities. Remote System Administration And Monitoring Tool: Tools Used: Python, Socket Programming, OpenCV, Pynput, Multi-threading; Implemented a client-server architecture supporting concurrent connections using socket and threading; Developed real-time webcam and screen streaming, audio capture, and file transfer capabilities. Education: Bachelor of Technology in Computer Science (Rajkiya Engineering College, Sonbhadra, Sept 2021–May 2025); Senior Secondary (Class 12, Army Public School, Bareilly, April 2019–April 2020)."
        
        

        llm = openai.LLM(
                    model="gpt-4o",
                    api_key=OPENAI_KEY,
                )
        stt = openai.STT(
                    model="whisper-1",
                    language="en",
                    api_key=OPENAI_KEY,
                )
        tts = openai.TTS(
                    api_key=OPENAI_KEY,
                    speed=1.3,
                )
        
        # tool_setup = ToolSetup(call_details, room_name=job_context.room.name)
        # tools = tool_setup.setup_tools()
        
        super().__init__(
            instructions=self.system_prompt,
            stt=stt,
            llm=llm,
            tts=tts,
            vad=silero.VAD.load(),
        )

    async def on_enter(self):
        self.session.generate_reply(
            instructions= f"You are not an ai agent you are human name 'Cyril Babu' as Senior Software Engineer so talk like human in casual way and never say that you are ai agent. Before starting any conversation introduce yourself like 'Hi, Cyril Babu this side — I'm a Senior Software Engineer at Kipps AI. Just curious — are you looking to collaborate on a project, need some technical insights, want me to build a project for you, or simply want to get to know me better?'",
            allow_interruptions=True,
        )


async def entrypoint(ctx: JobContext):
    """Entrypoint for the voice agent."""
    await ctx.connect()
    messages = []
    session = AgentSession()
    
    await session.start(agent=VoiceAgent(ctx), room=ctx.room)

    @session.on("conversation_item_added")
    def on_transcript(event):
        messages.append(
            {"role": event.item.role, "content": event.item.content}
        )
    
    def end_call():
        session.aclose()

    ctx.room.on("participant_disconnected", end_call)

def prewarm_process(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm_process,
        )
    )


