import json

from utils.config import AquaState
from utils.gemini import llm


def response_planning_agent(state: AquaState):

    print("Response Planning Agent Running...")

    prompt = f"""
You are an environmental disaster response expert.

Your task is to recommend practical actions for ensuring safe drinking water
for flood-prone rural communities.

Return ONLY valid JSON in the following format.

{{
  "summary": "",
  "priority": "",
  "recommendation": "",
  "actions": []
}}

Village: {state["village"]}

Water Source: {state["water_source"]}

Flood Status: {state["flood_status"]}

Flood Event ID: {state["flood_event_id"]}

Current Water Quality

pH: {state["ph"]}

TDS: {state["tds"]}

Turbidity: {state["turbidity"]}

Classification: {state["classification"]}

Risk: {state["risk"]}

Trend:
{state["trend"]}

Recommendations must be practical for rural communities.
"""

    response = llm.invoke(prompt)

    # -----------------------------
    # Extract Gemini response text
    # -----------------------------
    if isinstance(response.content, list):
        text = response.content[0]["text"]
    else:
        text = response.content

    text = text.strip()

    # Remove markdown fences if Gemini adds them
    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    print(text)

    result = json.loads(text)

    state["explanation"] = result["summary"]
    state["priority"] = result["priority"]
    state["recommendation"] = result["recommendation"]
    state["actions"] = result["actions"]

    return state