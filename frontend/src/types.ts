export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Vehicle {
  id: number;
  type: string;
  status: "available" | "rented" | "maintenance";
}

export interface Rental {
  id: number;
  customerId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
}

export interface CreateRentalRequest {
  customerId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
}
