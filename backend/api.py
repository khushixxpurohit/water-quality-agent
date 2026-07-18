from datetime import datetime

from fastapi import FastAPI

from backend.schemas import WaterInspection

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

        "reason": ""

    }

    result = graph.invoke(state)

    return result