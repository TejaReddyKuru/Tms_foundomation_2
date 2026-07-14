import os
import requests
from dotenv import load_dotenv
from .faq_data import FAQS

# Load environment variables from .env file
load_dotenv()

def ask_grok(question):
    context = ""
    for faq in FAQS:
        context += f"Question:\n{faq['question']}\nAnswer:\n{faq['answer']}\n\n"

    system_prompt = f"""
You are the official AI assistant for TMS Foundation.

Rules:
1. Answer only from the supplied FAQs.
2. Do not make up information.
3. Keep answers short and friendly.
4. If asked about workshops, CAiSMD, organizers or programs, answer only if the information exists in the FAQs.
5. If the answer is unavailable say:
"I'm sorry, that information is not available in the current TMS Foundation knowledge base. Please contact the organizers."
6. Never answer unrelated questions like coding, politics or mathematics.

FAQs:
{context}
"""
    api_key = os.environ.get("GROQ_API_KEY") or os.environ.get("GROK_API_KEY")
    if not api_key:
        return "I'm sorry, the chatbot is currently not configured properly. Please contact the organizers."

    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama-3.1-8b-instant",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            "temperature": 0.2
        }
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data, timeout=10)
        
        if response.status_code != 200:
            print(f"Chatbot Error: {response.text}")
            return "Sorry, I couldn't reach my brain. Please ensure the API key is correct."
            
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"Chatbot Exception: {e}")
        return "Sorry, I am having trouble connecting to my brain right now."
