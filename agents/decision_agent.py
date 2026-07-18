from utils.config import AquaState
from utils.logger import logger
def decision_agent(state: AquaState):

    print("Decision Agent Running...")
    

    # Default
    state["stop_execution"] = False
    state["next_agent"] = ""
    state["reason"] = ""

    # Invalid input
    if not state["valid"]:
        state["stop_execution"] = True
        state["reason"] = "Input validation failed."
        return state

    # Unsafe water
    if state["risk"] == "High":
        state["next_agent"] = "memory"
        state["reason"] = "High risk detected."

    # Medium risk
    elif state["risk"] == "Medium":
        state["next_agent"] = "memory"
        state["reason"] = "Further trend analysis required."

    # Safe water
    else:
        state["next_agent"] = "save"
        state["reason"] = "Water is safe."
    logger.info(
    f"Decision Agent -> Next Agent: {state['next_agent']}")
    return state