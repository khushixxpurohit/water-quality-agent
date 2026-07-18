from typing import TypedDict, List


class AquaState(TypedDict):
    village: str
    water_source: str
    timestamp: str

    flood_status: str
    flood_event_id: str

    ph: float
    tds: int
    turbidity: float

    # Validation
    valid: bool
    validation_message: str

    # Analysis
    classification: str
    risk: str
    trend: str

    # Response
    priority: str
    actions: List[str]
    recommendation: str
    report: str
    explanation: str

    # Memory
    history: List[dict]

    next_agent: str
    stop_execution: bool
    reason: str