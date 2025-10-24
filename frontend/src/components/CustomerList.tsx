import { useEffect, useState } from "react";
import { api } from "../api";

export function CustomerList() {
  const [customers, setCustomers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCustomers().then((d: any) => setCustomers(d));
    setLoading(false);
  });

  return (
    <div>
      <h2>Customers</h2>
      {loading && <div>Loading customers...</div>}
      <table>
        <tbody>
          {customers.map((c: any) => (
            <tr key={Math.random()}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
