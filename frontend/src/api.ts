import axios from 'axios';
import type { Customer, Vehicle, Rental, CreateRentalRequest } from './types';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
  getCustomers: async (): Promise<Customer[]> => {
    const response = await axios.get<Customer[]>(`${API_BASE_URL}/customers`);
    return response.data;
  },

  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await axios.get<Vehicle[]>(`${API_BASE_URL}/vehicles`);
    return response.data;
  },

  getRentals: async (): Promise<Rental[]> => {
    const response = await axios.get<Rental[]>(`${API_BASE_URL}/rentals`);
    return response.data;
  },

  createRental: async (request: CreateRentalRequest): Promise<Rental> => {
    const response = await axios.post<Rental>(`${API_BASE_URL}/rentals`, request);
    return response.data;
  },

  setVehicleMaintenance: async (vehicleId: number): Promise<Vehicle> => {
    const response = await axios.patch<Vehicle>(`${API_BASE_URL}/vehicles/${vehicleId}/maintenance`);
    return response.data;
  },
};
