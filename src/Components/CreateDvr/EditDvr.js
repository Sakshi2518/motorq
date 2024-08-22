import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './NewDvr.css';

const EditDvr = ({ setDrivers, drivers }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { driver } = location.state || {};

  const [driverID, setId] = useState(driver?.driverID || "");
  const [name, setName] = useState(driver?.name || "");
  const [email, setEmail] = useState(driver?.email || "");
  const [phone, setPhone] = useState(driver?.phone || "");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(driver?.vehicleAssigned || "");

  useEffect(() => {
    if (driver) {
      setId(driver.driverID);
      setName(driver.name);
      setEmail(driver.email);
      setPhone(driver.phone);
    }
  }, [driver]);

  useEffect(() => {
    // Fetch available vehicles
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:5000/vehicles');
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/assign-vehicle/${driverID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleId: selectedVehicle }), // Changed to vehicleId
      });
      
      const updatedDriver = { driverID, name, email, phone, vehicleAssigned: selectedVehicle };
      setDrivers(prevDrivers => prevDrivers.map(d => (d.driverID === driverID ? updatedDriver : d))); // Updated comparison key
      navigate('/driver-list');
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <form onSubmit={handleSubmit}>
          <div className='dvr-heading'>
            <p>Edit Details</p>
          </div>
          <div className="dvr-details">
            <div className="dvr-flex">
              <p>Driver ID</p>
              <input
                type="text"
                onChange={(e) => setId(e.target.value)}
                value={driverID}
                placeholder="Enter Driver ID"
                readOnly
                required
              />
            </div>

            <div className="dvr-flex">
              <p>Driver Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter Driver Name"
                required
              />
            </div>

            <div className="dvr-flex">
              <p>Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Driver Email"
                required
              />
            </div>

            <div className="dvr-flex">
              <p>Phone Number</p>
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Enter Phone Number"
                required
              />
            </div>

            <div className="dvr-flex">
              <p>Assign Vehicle</p>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                required
              >
                <option value="">Select a vehicle</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle._id} value={vehicle._id}> {/* Changed to vehicle._id */}
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit">UPDATE DRIVER</button>
        </form>
      </div>
    </div>
  );
};

export default EditDvr;
