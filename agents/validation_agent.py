from utils.config import AquaState


def validation_agent(state: AquaState):

    print("Validation Agent Running...")

    # pH validation
    if state["ph"] < 0 or state["ph"] > 14:
        state["valid"] = False
        state["validation_message"] = "Invalid pH value."
        return state

    # TDS validation
    if state["tds"] < 0:
        state["valid"] = False
        state["validation_message"] = "Invalid TDS value."
        return state

    # Turbidity validation
    if state["turbidity"] < 0:
        state["valid"] = False
        state["validation_message"] = "Invalid Turbidity value."
        return state

    state["valid"] = True
    state["validation_message"] = "Input validated successfully."

    return state