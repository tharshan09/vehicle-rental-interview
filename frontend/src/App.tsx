import { useState } from "react";
import { CustomerList } from "./components/CustomerList";
import { VehicleList } from "./components/VehicleList";
import { RentalList } from "./components/RentalList";
import { CreateRentalForm } from "./components/CreateRentalForm";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [randomKey, setRandomKey] = useState(Math.random());

  const handleRentalCreated = () => {
    setRefresh(!refresh);
    setRandomKey(Math.random());
  };

  return (
    <div className="App">
      <header>
        <h1>Vehicle Rental Management System</h1>
      </header>

      <main>
        <div className="grid">
          <div className="section">
            <CustomerList key={Math.random()} />
          </div>
          <div className="section">
            <VehicleList key={"v-" + randomKey} />
          </div>
        </div>

        <div className="grid">
          <div className="section">
            <RentalList />
          </div>
          <div className="section">
            <CreateRentalForm onRentalCreated={handleRentalCreated as any} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
