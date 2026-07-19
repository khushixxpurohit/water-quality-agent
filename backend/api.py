from datetime import datetime

from fastapi import FastAPI

from backend.schemas import WaterInspection
from utils.history import load_history
from workflows.graph import graph
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="AquaSentinel API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message": "AquaSentinel API Running"
    }


@app.post("/analyze")
def analyze(data: WaterInspection):

    state = {

        "village": data.village,

        "water_source": data.water_source,

        "timestamp": str(datetime.now()),

        "flood_status": data.flood_status,

        "flood_event_id": data.flood_event_id,

        "ph": data.ph,

        "tds": data.tds,

        "turbidity": data.turbidity,

        "valid": False,

        "validation_message": "",

        "classification": "",

        "risk": "",

        "trend": "",

        "priority": "",

        "actions": [],

        "recommendation": "",

        "report": "",

        "explanation": "",

        "history": [],

        "next_agent": "",

        "stop_execution": False,

        "reason": "",

        "alert": {},
        
        "emergency_level": "",

    }
    

    result = graph.invoke(state)

    return result

@app.get("/history")
def get_history():

    return load_history()


@app.get("/analytics")
def analytics():

    history = load_history()

    total = len(history)

    safe = sum(
        1 for h in history
        if h["classification"] == "Safe"
    )

    treatment = sum(
        1 for h in history
        if h["classification"] == "Needs Treatment"
    )

    unsafe = sum(
        1 for h in history
        if h["classification"] == "Unsafe"
    )

    high = sum(
        1 for h in history
        if h["risk"] == "High"
    )

    medium = sum(
        1 for h in history
        if h["risk"] == "Medium"
    )

    low = sum(
        1 for h in history
        if h["risk"] == "Low"
    )

    return {
        "total_inspections": total,
        "safe": safe,
        "needs_treatment": treatment,
        "unsafe": unsafe,
        "high_risk": high,
        "medium_risk": medium,
        "low_risk": low
    }