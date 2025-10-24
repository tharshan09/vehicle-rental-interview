from pydantic import BaseModel, EmailStr, field_validator
from typing import Literal
from datetime import date


class Customer(BaseModel):
    id: int
    name: str
    email: EmailStr


class Vehicle(BaseModel):
    id: int
    type: str
    status: Literal["available", "rented", "maintenance"]


class Rental(BaseModel):
    id: int
    customerId: int
    vehicleId: int
    startDate: date
    endDate: date


class CreateRentalRequest(BaseModel):
    customerId: int
    vehicleId: int
    startDate: date
    endDate: date

    @field_validator('endDate')
    @classmethod
    def validate_dates(cls, end_date: date, info) -> date:
        start_date = info.data.get('startDate')
        if start_date and end_date < start_date:
            raise ValueError('End date must be after or equal to start date')
        return end_date
