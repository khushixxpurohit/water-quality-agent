from utils.config import AquaState
from utils.logger import logger

def supervisor_agent(state: AquaState):

    print("\n===== Supervisor Agent =====")
    logger.info(
    f"Supervisor routed workflow to {state['next_agent']}"
)

    # ---------------------------------
    # Validation Failed
    # ---------------------------------
    if not state["valid"]:

        state["stop_execution"] = True
        state["next_agent"] = "END"
        state["reason"] = "Input validation failed."

    # ---------------------------------
    # Emergency Cases
    # ---------------------------------
    elif (
        state["risk"] == "High"
        or state["classification"] == "Unsafe"
    ):

        state["stop_execution"] = False
        state["next_agent"] = "escalation"
        state["reason"] = "High-risk water source detected."

    # ---------------------------------
    # Medium Risk / Needs Treatment
    # ---------------------------------
    elif (
        state["risk"] == "Medium"
        or state["classification"] == "Needs Treatment"
        or state["flood_status"] == "Post-Flood"
    ):

        state["stop_execution"] = False
        state["next_agent"] = "memory"
        state["reason"] = "Trend analysis required before final response."

    # ---------------------------------
    # Safe Water
    # ---------------------------------
    else:

        state["stop_execution"] = False
        state["next_agent"] = "automation"
        state["reason"] = "Water is safe. Proceed to automation."

    print("Next Agent :", state["next_agent"])
    print("Reason     :", state["reason"])

    return state