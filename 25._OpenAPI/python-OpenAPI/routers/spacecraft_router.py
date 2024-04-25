from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

class Spacecraft(BaseModel):
    id: int
    name: str


spacecrafts = [
    Spacecraft(id=0, name= "Voyager"),
    Spacecraft(id=1, name= "Casini"),
    Spacecraft(id=2, name= "Apollo 11"),
    Spacecraft(id=3, name= "Apollo 13"),
    Spacecraft(id=4, name= "Apollo 15"),
]


router = APIRouter()

@router.get("/api/spacecrafts", tags=["spacecrafts"], response_model=list[Spacecraft])
async def read_spacecraft():
    return spacecrafts

@router.get("/api/spacecrafts/{spacecraft_id}", tags=["spacecrafts"], response_model=Spacecraft)
async def _(spacecraft_id: int):
    for spacecraft in spacecrafts:
        if spacecraft.id == spacecraft_id:
            return spacecraft
    raise HTTPException(status_code=404, detail="Spacecraft not found")

@router.post("/api/spacecrafts", tags=["spacecrafts"], response_model=Spacecraft)
async def create_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft


