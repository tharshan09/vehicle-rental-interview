import { useState } from 'react';
import { CustomerList } from './components/CustomerList';
import { VehicleList } from './components/VehicleList';
import { RentalList } from './components/RentalList';
import { CreateRentalForm } from './components/CreateRentalForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRentalCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="App">
      <header>
        <h1>Vehicle Rental Management System</h1>
      </header>
      
      <main>
        <div className="grid">
          <div className="section">
            <CustomerList key={`customers-${refreshKey}`} />
          </div>
          
          <div className="section">
            <VehicleList key={`vehicles-${refreshKey}`} />
          </div>
        </div>

        <div className="grid">
          <div className="section">
            <RentalList key={`rentals-${refreshKey}`} />
          </div>
          
          <div className="section">
            <CreateRentalForm onRentalCreated={handleRentalCreated} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
