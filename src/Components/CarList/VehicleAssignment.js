import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VehicleAssignment.css';

const VehicleAssignment = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriversAndVehicles = async () => {
      try {
        const driversResponse = await fetch('http://localhost:5000/drivers');
        const driversData = await driversResponse.json();
        console.log('Drivers Data:', driversData); // Log drivers data
        setDrivers(driversData);
  
        const vehiclesResponse = await fetch('http://localhost:5000/vehicles');
        const vehiclesData = await vehiclesResponse.json();
        console.log('Vehicles Data:', vehiclesData); // Log vehicles data
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDriversAndVehicles();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/assign-vehicle/${selectedDriver}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId: selectedVehicle })
      });
      navigate('/driver-list'); 
    } catch (error) {
      console.error('Error assigning vehicle:', error);
    }
  };

  return (
    <div className="assign-vehicle-container">
      <h2>Assign Vehicle to Driver</h2>
      <div className="form-group">
        <label htmlFor="driver-select"></label>
        <select
          id="driver-select"
          onChange={(e) => setSelectedDriver(e.target.value)}
          value={selectedDriver}
        >
          <option value="">Select Driver</option>
          {drivers.map(driver => (
            <option key={driver._id} value={driver._id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="vehicle-select"></label>
        <select
          id="vehicle-select"
          onChange={(e) => setSelectedVehicle(e.target.value)}
          value={selectedVehicle}
        >
          <option value="">Select Vehicle</option>
          {vehicles.map(vehicle => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.makeModel}
            </option>
          ))}
        </select>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Assign Vehicle
      </button>
    </div>
  );
}  
export default VehicleAssignment;
