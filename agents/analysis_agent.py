from utils.config import AquaState
from utils.logger import logger

def analysis_agent(state: AquaState):

    print("Analysis Agent Running...")
    score = 0

    # -------------------------
    # pH Analysis
    # -------------------------
    if state["ph"] < 6.0 or state["ph"] > 9.0:
        score += 2
    elif state["ph"] < 6.5 or state["ph"] > 8.5:
        score += 1

    # -------------------------
    # TDS Analysis
    # -------------------------
    if state["tds"] > 500:
        score += 2
    elif state["tds"] > 300:
        score += 1

    # -------------------------
    # Turbidity Analysis
    # -------------------------
    if state["turbidity"] > 10:
        score += 2
    elif state["turbidity"] > 5:
        score += 1

    # -------------------------
    # Final Classification
    # -------------------------
    if score == 0:
        state["classification"] = "Safe"
        state["risk"] = "Low"

    elif score <= 3:
        state["classification"] = "Needs Treatment"
        state["risk"] = "Medium"

    else:
        state["classification"] = "Unsafe"
        state["risk"] = "High"
    logger.info(
    f"Analysis complete | Classification={state['classification']} | Risk={state['risk']}"
)
    return state