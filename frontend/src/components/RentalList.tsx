import { useEffect, useState } from 'react';
import type { Rental, Customer, Vehicle } from '../types';
import { api } from '../api';

export function RentalList() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [rentalsData, customersData, vehiclesData] = await Promise.all([
        api.getRentals(),
        api.getCustomers(),
        api.getVehicles(),
      ]);
      setRentals(rentalsData);
      setCustomers(customersData);
      setVehicles(vehiclesData);
    } catch (error) {
      alert('Failed to load rentals: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerName = (customerId: number) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : `Unknown (${customerId})`;
  };

  const getVehicleType = (vehicleId: number) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.type : `Unknown (${vehicleId})`;
  };

  if (loading) return <div>Loading rentals...</div>;

  return (
    <div>
      <h2>Rentals</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>{getCustomerName(rental.customerId)}</td>
              <td>{getVehicleType(rental.vehicleId)}</td>
              <td>{rental.startDate}</td>
              <td>{rental.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
