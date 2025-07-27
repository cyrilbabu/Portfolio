from .models import VoiceBot
from rest_framework import serializers

class VoiceBotSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceBot
        fields = ['id', 'views']