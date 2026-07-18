from langgraph.graph import StateGraph, END

from utils.config import AquaState

from agents.monitoring_agent import monitoring_agent
from agents.validation_agent import validation_agent
from agents.analysis_agent import analysis_agent
from agents.decision_agent import decision_agent
from agents.supervisor_agent import supervisor_agent
from agents.memory_agent import memory_trend_agent
from agents.response_agent import response_planning_agent
from agents.automation_agent import automation_agent


builder = StateGraph(AquaState)

builder.add_node("automation", automation_agent)
builder.add_node("monitoring", monitoring_agent)

builder.add_node("validation", validation_agent)

builder.add_node("analysis", analysis_agent)

builder.add_node("decision", decision_agent)

builder.add_node("supervisor", supervisor_agent)

builder.add_node("memory", memory_trend_agent)

builder.add_node("response", response_planning_agent)

builder.set_entry_point("monitoring")

builder.add_edge("monitoring", "validation")

builder.add_edge("validation", "analysis")

builder.add_edge("analysis", "decision")

builder.add_edge("decision", "supervisor")

def supervisor_router(state: AquaState):

    if state["stop_execution"]:
        return END

    return state["next_agent"]

builder.add_conditional_edges(
    "supervisor",
    supervisor_router,
    {
        "memory": "memory",
        END: END
    }
)
builder.add_edge("memory", "response")

builder.add_edge("response", "automation")

builder.add_edge("automation", END)

graph = builder.compile()