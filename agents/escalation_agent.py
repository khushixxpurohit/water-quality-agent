from utils.config import AquaState
from utils.logger import logger

def escalation_agent(state: AquaState):

    # print("\n===== Escalation Agent =====")
    

    emergency_level = "Critical"

    #status = state["flood_status"].strip().lower()

    status = state["flood_status"].lower()
    
    if state["risk"] == "High":
        if "flood" in status and "post" not in status:
            emergency_level = "Critical"
            
        elif "post" in status:
            emergency_level = "High"

        else:
            emergency_level = "Medium"

    state["emergency_level"] = emergency_level

    state["alert"] = {

        "authority": "District Disaster Management Authority",

        "severity": emergency_level,

        "village": state["village"],

        "water_source": state["water_source"],

        "risk": state["risk"],

        "classification": state["classification"],

        "recommended_action":
            "Immediate field inspection and emergency water supply.",

        "follow_up":
            "Within 24 Hours"

    }

    print("Emergency Level :", state["emergency_level"])
    print("Authority       :", state["alert"]["authority"])
    print("Follow-up       :", state["alert"]["follow_up"])
    logger.warning(
    f"Emergency detected | Level={state['emergency_level']}"
)
    return state