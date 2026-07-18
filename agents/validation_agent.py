from utils.config import AquaState
from utils.logger import logger

def validation_agent(state: AquaState):

    print("Validation Agent Running...")
    logger.info("Validation Agent started.")
    # pH validation
    if state["ph"] < 0 or state["ph"] > 14:
        state["valid"] = False
        state["validation_message"] = "Invalid pH value."
        logger.error(state["validation_message"])
        return state

    # TDS validation
    if state["tds"] < 0:
        state["valid"] = False
        state["validation_message"] = "Invalid TDS value."
        logger.error(state["validation_message"])
        return state

    # Turbidity validation
    if state["turbidity"] < 0:
        state["valid"] = False
        state["validation_message"] = "Invalid Turbidity value."
        logger.error(state["validation_message"])
        return state

    state["valid"] = True
    state["validation_message"] = "Input validated successfully."
    logger.info("Input validation successful.")

    return state