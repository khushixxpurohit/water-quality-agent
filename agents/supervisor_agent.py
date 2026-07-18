from utils.config import AquaState

def supervisor_agent(state: AquaState):

    print("\n===== Supervisor Agent =====")

    print("Next Agent :", state["next_agent"])
    print("Reason     :", state["reason"])

    return state