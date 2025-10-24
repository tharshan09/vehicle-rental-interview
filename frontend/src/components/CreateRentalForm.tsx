import { useState, useEffect } from 'react';
import type { Customer, Vehicle, CreateRentalRequest } from '../types';
import { api } from '../api';

interface CreateRentalFormProps {
  onRentalCreated: () => void;
  onVehiclesChanged?: () => void;
}

export function CreateRentalForm({ onRentalCreated, onVehiclesChanged }: CreateRentalFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateRentalRequest>({
    customerId: 0,
    vehicleId: 0,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersData, vehiclesData] = await Promise.all([
        api.getCustomers(),
        api.getVehicles(),
      ]);
      setCustomers(customersData);
      setVehicles(vehiclesData);
    } catch (error) {
      alert('Failed to load form data: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const refreshVehicles = async () => {
    try {
      const vehiclesData = await api.getVehicles();
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Failed to refresh vehicles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerId || !formData.vehicleId || !formData.startDate || !formData.endDate) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await api.createRental(formData);
      alert('Rental created successfully!');
      setFormData({
        customerId: 0,
        vehicleId: 0,
        startDate: '',
        endDate: '',
      });
      await refreshVehicles();
      onRentalCreated();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message;
      alert('Failed to create rental: ' + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading form...</div>;

  const availableVehicles = vehicles.filter((v) => v.status === 'available');

  return (
    <div>
      <h2>Create New Rental</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">Customer:</label>
          <select
            id="customer"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: Number(e.target.value) })}
            required
          >
            <option value={0}>-- Select Customer --</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="vehicle">Vehicle:</label>
          <select
            id="vehicle"
            value={formData.vehicleId}
            onChange={(e) => setFormData({ ...formData, vehicleId: Number(e.target.value) })}
            required
          >
            <option value={0}>-- Select Vehicle --</option>
            {availableVehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.type} (ID: {vehicle.id})
              </option>
            ))}
          </select>
          {availableVehicles.length === 0 && (
            <p className="warning">No vehicles available for rental</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>

        <button type="submit" disabled={submitting || availableVehicles.length === 0}>
          {submitting ? 'Creating...' : 'Create Rental'}
        </button>
      </form>
    </div>
  );
}
