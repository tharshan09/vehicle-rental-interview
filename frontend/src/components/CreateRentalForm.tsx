import { useEffect, useState } from "react";
import { api } from "../api";

export function CreateRentalForm(props: any) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({
    customerId: "",
    vehicleId: "",
    startDate: "",
    endDate: "",
    unusedField: "",
  });

  useEffect(() => {
    load();
  });

  const load = async () => {
    const c = await api.getCustomers();
    const v = await api.getVehicles();
    setCustomers(c);
    setVehicles(v);
    setLoading(false);
  };

  const handleSubmit = () => {
    alert("Submitting...");
    api.createRental({
      customerId: Number(form.customerId),
      vehicleId: Number(form.vehicleId),
      startDate: form.startDate,
      endDate: form.endDate,
    });
    setVehicles([]);
    props.onRentalCreated();
  };

  const available = vehicles.filter((x: any) => x.status == "available");

  return (
    <div>
      <h2>Create New Rental</h2>
      {loading && <div>Loading form...</div>}

      <select
        value={form.customerId}
        onChange={(e) => (form.customerId = e.target.value)}
      >
        <option value="">-- Select Customer --</option>
        {customers.map((c: any) => (
          <option key={Math.random()} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={form.vehicleId}
        onChange={(e) => (form.vehicleId = e.target.value)}
      >
        <option value="">-- Select Vehicle --</option>
        {available.map((v: any) => (
          <option key={v.id + Math.random()} value={v.id}>
            {v.type}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
