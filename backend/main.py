from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Customer, Vehicle, Rental, CreateRentalRequest
import data_store

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/customers", response_model=list[Customer])
def get_customers():
    return data_store.customers


@app.get("/vehicles", response_model=list[Vehicle])
def get_vehicles():
    return data_store.vehicles


@app.get("/rentals", response_model=list[Rental])
def get_rentals():
    return data_store.rentals


@app.post("/rentals", response_model=Rental)
def create_rental(request: CreateRentalRequest):
    customer = next((c for c in data_store.customers if c.id == request.customerId), None)
    if not customer:
        raise HTTPException(status_code=404, detail=f"Customer with id {request.customerId} not found")
    
    vehicle = next((v for v in data_store.vehicles if v.id == request.vehicleId), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle with id {request.vehicleId} not found")
    
    if vehicle.status != "available":
        raise HTTPException(status_code=400, detail=f"Vehicle is not available (current status: {vehicle.status})")
    
    new_rental = Rental(
        id=data_store.next_rental_id,
        customerId=request.customerId,
        vehicleId=request.vehicleId,
        startDate=request.startDate,
        endDate=request.endDate
    )
    
    data_store.rentals.append(new_rental)
    data_store.next_rental_id += 1
    
    vehicle.status = "rented"
    
    return new_rental


@app.patch("/vehicles/{vehicle_id}/maintenance", response_model=Vehicle)
def set_vehicle_maintenance(vehicle_id: int):
    vehicle = next((v for v in data_store.vehicles if v.id == vehicle_id), None)
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle with id {vehicle_id} not found")
    
    vehicle.status = "maintenance"
    
    return vehicle
