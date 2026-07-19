import json
import os

HISTORY_FILE = "storage/history.json"


def load_history():

    if not os.path.exists(HISTORY_FILE):

        return []

    with open(HISTORY_FILE, "r") as f:

        return json.load(f)


def save_history(data):

    with open(HISTORY_FILE, "w") as f:

        json.dump(data, f, indent=4)


def add_inspection(state):

    history = load_history()

    inspection = {

        "village": state["village"],

        "water_source": state["water_source"],

        "flood_status": state["flood_status"],

        "event_id": state["flood_event_id"],

        "ph": state["ph"],

        "tds": state["tds"],

        "turbidity": state["turbidity"],

        "classification": state["classification"],

        "risk": state["risk"],

        "priority": state.get("priority", ""),

        "trend": state.get("trend", ""),

        "recommendation": state.get("recommendation", "")

    }

    history.append(inspection)

    save_history(history)