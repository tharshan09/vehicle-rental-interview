import { useEffect, useState } from 'react';
import type { Vehicle } from '../types';
import { api } from '../api';

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await api.getVehicles();
      setVehicles(data);
    } catch (error) {
      alert('Failed to load vehicles: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetMaintenance = async (vehicleId: number) => {
    try {
      await api.setVehicleMaintenance(vehicleId);
      loadVehicles();
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message;
      alert('Failed to set maintenance: ' + errorMessage);
    }
  };

  if (loading) return <div>Loading vehicles...</div>;

  return (
    <div>
      <h2>Vehicles</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.type}</td>
              <td>
                <span className={`status-${vehicle.status}`}>
                  {vehicle.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleSetMaintenance(vehicle.id)}
                  disabled={vehicle.status === 'maintenance'}
                >
                  Set Maintenance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
