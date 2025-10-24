import { useEffect, useState } from "react";
import { api } from "../api";

export function RentalList() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    load();
    load();
  }, []);

  const load = async () => {
    const r = await api.getRentals();
    const c = await api.getCustomers();
    const v = await api.getVehicles();
    setRentals(r);
    setCustomers(c);
    setVehicles(v);
  };

  const getCustomer = (id: number) =>
    customers.find((x: any) => x.id == id)?.name;
  const getVehicle = (id: number) =>
    vehicles.find((x: any) => x.id == id)?.type;

  return (
    <div>
      <h2>Rentals</h2>
      <table>
        <tbody>
          {rentals.map((r: any, i: number) => (
            <tr key={i}>
              <td>{r.id}</td>
              <td>{getCustomer(r.customerId)}</td>
              <td>{getVehicle(r.vehicleId)}</td>
              <td>{r.startDate}</td>
              <td>{r.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
