import os
import requests


API_KEY = os.getenv("OPENROUTER_API_KEY")


def fallback_classifier(description: str):
    text = description.lower()

    if any(word in text for word in ["payment", "charged", "refund", "billing"]):
        return {"category": "billing", "priority": "high"}

    if any(word in text for word in ["login", "password", "account"]):
        return {"category": "account", "priority": "medium"}

    if any(word in text for word in ["error", "bug", "crash", "not working"]):
        return {"category": "technical", "priority": "high"}

    return {"category": "general", "priority": "low"}


def classify_ticket(description: str):
    try:
        prompt = f"""
Classify this support ticket.

Category: billing, technical, account, general
Priority: low, medium, high, critical

Return ONLY like:

Category: <value>
Priority: <value>

Ticket:
{description}
"""

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
            },
            timeout=10,
        )

        data = response.json()

        if "choices" not in data:
            raise Exception("LLM unavailable")

        text = data["choices"][0]["message"]["content"].strip()

        category = "general"
        priority = "low"

        for line in text.split("\n"):
            if "category" in line.lower():
                category = line.split(":")[-1].strip().lower()
            if "priority" in line.lower():
                priority = line.split(":")[-1].strip().lower()

        return {
            "category": category,
            "priority": priority,
        }

    except Exception as e:
        print("LLM FAILED — using fallback:", e)
        return fallback_classifier(description)
