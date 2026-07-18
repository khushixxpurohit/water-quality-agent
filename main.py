from datetime import datetime

from utils.config import AquaState
from workflows.graph import graph
from utils.helpers import save_memory
from agents.automation_agent import automation_agent


state: AquaState = {

    "village": "Rampur",

    "water_source": "Hand Pump",

    "timestamp": str(datetime.now()),

    "flood_status": "Flood",

    "flood_event_id": "WB-2026-001",

    "ph": 4.5,

    "tds": 900,

    "turbidity": 12,

    "valid": False,

    "validation_message": "",

    "classification": "",

    "risk": "",

    "trend": "",

    "priority": "",

    "actions": [],

    "recommendation": "",

    "report": "",

    "explanation": "",

    "history": [],

    "next_agent": "",

    "stop_execution": False,

    "reason": "",

    "alert": {},
    
    "emergency_level": "",

}


# Run the entire multi-agent workflow
result = graph.invoke(state)


# Save inspection into memory
# save_memory(result)
# state = automation_agent(state)


print("\n========== FINAL REPORT ==========\n")

print("Village:", result["village"])

print("Classification:", result["classification"])

print("Risk:", result["risk"])

print("Trend:", result["trend"])

print("Priority:", result["priority"])

print("\nRecommendation:")

print(result["recommendation"])

print("\nActions:")

for i, action in enumerate(result["actions"], 1):
    print(f"{i}. {action}")