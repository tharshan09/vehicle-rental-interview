from models import Customer, Vehicle, Rental
from datetime import date

customers: list[Customer] = [
    Customer(id=1, name="John Doe", email="john.doe@example.com"),
    Customer(id=2, name="Jane Smith", email="jane.smith@example.com"),
    Customer(id=3, name="Bob Johnson", email="bob.johnson@example.com"),
]

vehicles: list[Vehicle] = [
    Vehicle(id=1, type="Car", status="available"),
    Vehicle(id=2, type="Van", status="available"),
    Vehicle(id=3, type="Truck", status="available"),
    Vehicle(id=4, type="Car", status="rented"),
    Vehicle(id=5, type="Van", status="maintenance"),
]

rentals: list[Rental] = [
    Rental(id=1, customerId=1, vehicleId=4, startDate=date(2025, 10, 20), endDate=date(2025, 10, 25)),
]

next_rental_id = 2
