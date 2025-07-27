from django.db import models

# Create your models here.
class VoiceBot(models.Model):
    views = models.IntegerField(default=0)