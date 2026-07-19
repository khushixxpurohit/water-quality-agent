from utils.config import AquaState
from utils.logger import logger
from utils.history import load_history

def memory_trend_agent(state: AquaState):

    print("Memory & Trend Agent Running...")
    logger.info(
    f"Memory Agent completed | Trend={state['trend']}"
)

    history = load_history()

    # Get all inspections for this village
    village_history = [
        h for h in history
        if h["village"] == state["village"]
    ]

    state["history"] = village_history

    # Need at least 2 inspections
    if len(village_history) < 3:
        state["trend"] = "No historical trend available."
        return state

    # Analyze last 3 inspections
    recent = village_history[-3:]

    tds_values = [r["tds"] for r in recent]
    turbidity_values = [r["turbidity"] for r in recent]
    ph_values = [r["ph"] for r in recent]

    # Determine trend
    improving = (
        turbidity_values[2] < turbidity_values[1] < turbidity_values[0]
        and tds_values[2] < tds_values[1] < tds_values[0]
    )

    deteriorating = (
        turbidity_values[2] > turbidity_values[1] > turbidity_values[0]
        and tds_values[2] > tds_values[1] > tds_values[0]
    )

    if improving:
        state["trend"] = "Water quality is consistently improving."

    elif deteriorating:
        state["trend"] = "Water quality is consistently deteriorating."

    else:
        state["trend"] = "Water quality is fluctuating with no clear trend."

    print("Trend:", state["trend"])

    return state