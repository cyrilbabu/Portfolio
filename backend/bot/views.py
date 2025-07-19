# views.py
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from livekit import api
import json
from bot.utils import openai_api_request
import uuid
from rest_framework import status


load_dotenv()

@csrf_exempt
def get_livekit_token(request):
    # Load credentials from environment variables
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    url = os.getenv("LIVEKIT_URL")  

    if not all([api_key, api_secret, url]):
        return JsonResponse({"error": "Missing LiveKit credentials."}, status=500)
    
    call_type = request.GET.get("call_type")
    
    user_identity = "user"
    room_name = uuid.uuid4().hex
    user_name = "user"
    
    room_name = f"{room_name}_{call_type}"
    print(f"Room name: {room_name}")
    token = api.AccessToken(api_key, api_secret)\
        .with_identity(user_identity)\
        .with_name(user_name)\
        .with_grants(api.VideoGrants(
            room_join=True,
            room=room_name,
        )).to_jwt()

    return JsonResponse({
        "token": token,
        "room": room_name,
        "url": url
    }, status=status.HTTP_200_OK)



@csrf_exempt
def get_chat_reply(request):
    if request.method == "POST":
        try:
            # Parse the JSON body to get the user message
            body = json.loads(request.body)
            user_message = body.get("message", "")
            conversation = body.get("conversation", [])

            if not user_message:
                return JsonResponse({"error": "Message is required"}, status=400)

            reply = openai_api_request(user_message, conversation)
            
            return JsonResponse({"reply": reply}) 

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
