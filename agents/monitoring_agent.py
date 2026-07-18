from utils.config import AquaState
from utils.helpers import load_memory


def monitoring_agent(state: AquaState):

    print("===== Monitoring Agent =====")
    print(f"Village : {state['village']}")
    print(f"Source  : {state['water_source']}")

    state["history"] = load_memory()

    return state