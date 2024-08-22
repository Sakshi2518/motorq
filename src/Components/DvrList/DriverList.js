import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { FaEdit, FaTrash, FaCar } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import './DriverList.css';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriversAndVehicles = async () => {
      try {
        const driversResponse = await fetch('http://localhost:5000/drivers');
        const driversData = await driversResponse.json();
        setDrivers(driversData);
        setFilteredDrivers(driversData);

        const vehiclesResponse = await fetch('http://localhost:5000/vehicles');
        const vehiclesData = await vehiclesResponse.json();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDriversAndVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
        await fetch(`http://localhost:5000/drivers/${id}`, { method: 'DELETE' });

        // Update local state to immediately reflect the change
        setDrivers(drivers.filter(driver => driver._id !== id));
        setFilteredDrivers(filteredDrivers.filter(driver => driver._id !== id));
    } catch (error) {
        console.error('Error deleting driver:', error);
    }
};


  const handleEdit = (driver) => {
    navigate('/edit-driver', { state: { driver } });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = drivers.filter(driver => 
      (driver.name && driver.name.toLowerCase().includes(query)) || 
      (driver.phone && driver.phone.toString().toLowerCase().includes(query))
    );

    setFilteredDrivers(filtered);
  };

  const getVehicleName = (vehicleId) => {
    if (!vehicleId) return 'N/A';
    const vehicle = vehicles.find(v => v._id === vehicleId);
    return vehicle ? vehicle.makeModel : 'N/A';
  };
  
  return (
    <div className="driver-list-container">
      <Header />
      
      <div className="search-assign-container">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by name or phone number" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>
        
        <div className="assign-button-container">
          <button className="assign-button" onClick={() => navigate('/assign-vehicle')}>
            Assign Vehicle
          </button>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Vehicle Assigned</th>
            <th>Time Duration</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver.driverID}</td>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.phone !== undefined ? driver.phone.toString() : 'N/A'}</td>
              <td>{getVehicleName(driver.vehicleAssigned)}</td> {/* Updated here */}
              <td>{driver.timeDuration || 'N/A'}</td>
              <td className='action-btn'>
                <button onClick={() => handleEdit(driver)}>
                  <FaEdit className="icon" />
                </button>
              </td>
              <td className='action-btn'>
                <button onClick={() => handleDelete(driver._id)}>
                  <FaTrash className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
    };
    
    export default DriverList;