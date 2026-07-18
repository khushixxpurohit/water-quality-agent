import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MEMORY_FILE = os.path.join(BASE_DIR, "data", "history.json")


def load_memory():

    if not os.path.exists(MEMORY_FILE):
        return []

    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []


def save_memory(state):

    history = load_memory()

    record = {
        "timestamp": state["timestamp"],
        "village": state["village"],
        "water_source": state["water_source"],
        "flood_status": state["flood_status"],
        "flood_event_id": state["flood_event_id"],
        "ph": state["ph"],
        "tds": state["tds"],
        "turbidity": state["turbidity"],
        "classification": state["classification"],
        "risk": state["risk"]
    }

    history.append(record)

    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=4)