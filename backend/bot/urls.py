from django.urls import path
from .views import get_livekit_token, get_chat_reply, increment_voicebot_view

urlpatterns = [
    path('voicebot/', get_livekit_token),
    path('chatbot/', get_chat_reply),
    path('voicebot/<int:voicebot_id>/increment/', increment_voicebot_view),
]