from utils.config import AquaState
from utils.helpers import load_memory


def memory_trend_agent(state: AquaState):

    print("Memory & Trend Agent Running...")

    history = load_memory()

    # Get all inspections for this village
    village_history = [
        h for h in history
        if h["village"] == state["village"]
    ]

    state["history"] = village_history

    # Need at least 2 inspections
    if len(village_history) < 2:
        state["trend"] = "No historical trend available."
        return state

    # Look at last 5 inspections
    recent = village_history[-5:]

    avg_tds = sum(r["tds"] for r in recent) / len(recent)
    avg_turbidity = sum(r["turbidity"] for r in recent) / len(recent)

    current_tds = state["tds"]
    current_turbidity = state["turbidity"]

    if current_tds > avg_tds and current_turbidity > avg_turbidity:
        state["trend"] = (
            "Water quality is deteriorating compared to recent inspections."
        )

    elif current_tds < avg_tds and current_turbidity < avg_turbidity:
        state["trend"] = (
            "Water quality is improving compared to recent inspections."
        )

    else:
        state["trend"] = (
            "Water quality is relatively stable."
        )

    return state