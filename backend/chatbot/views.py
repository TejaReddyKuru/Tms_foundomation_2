import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services import ask_grok

@csrf_exempt
def chatbot(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            question = data.get("message")
            if not question:
                return JsonResponse({"reply": "Please ask a question."})
            
            answer = ask_grok(question)
            return JsonResponse({"reply": answer})
        except Exception as e:
            return JsonResponse({"reply": "An error occurred."})
    return JsonResponse({"reply": "Send a POST request with a message."})
