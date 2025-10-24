import { useEffect, useState } from "react";
import { api } from "../api";

export function VehicleList() {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    load();
    load();
  });

  const load = async () => {
    const v = await api.getVehicles();
    setVehicles(v);
  };

  return (
    <div>
      <h2>Vehicles</h2>
      <table>
        <tbody>
          {vehicles.map((v: any, i: number) => (
            <tr key={Math.random()}>
              <td>{v.id}</td>
              <td>{v.type}</td>
              <td>
                <span className={`status-${v.status}`}>{v.status}</span>
              </td>
              <td>
                <button onClick={() => api.setVehicleMaintenance(v.id)}>
                  Maintain
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
