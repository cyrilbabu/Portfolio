from django.urls import path
from .views import get_livekit_token, get_chat_reply

urlpatterns = [
    path('voicebot/', get_livekit_token),
    path('chatbot/', get_chat_reply),
]