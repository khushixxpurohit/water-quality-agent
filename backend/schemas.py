from pydantic import BaseModel


class WaterInspection(BaseModel):
    village: str
    water_source: str

    flood_status: str
    flood_event_id: str

    ph: float
    tds: int
    turbidity: float