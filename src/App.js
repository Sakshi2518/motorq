import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Header/Home';
import NewDvr from './Components/CreateDvr/NewDvr';
import VehicleAssignment from './Components/CarList/VehicleAssignment';
import DriverList from './Components/DvrList/DriverList';
import EditDvr from './Components/CreateDvr/EditDvr';

function App() {
  const [drivers, setDrivers] = useState([]);

  const addDriver = (driver) => {
    setDrivers([...drivers, driver]);
  };

  const updateDriver = (updatedDriver) => {
    setDrivers(drivers.map(driver => driver.id === updatedDriver.id ? updatedDriver : driver));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-driver" element={<NewDvr addDriver={addDriver} />} />
        <Route path="/driver-list" element={<DriverList drivers={drivers} setDrivers={setDrivers} />} />
        <Route path="/edit-driver" element={<EditDvr updateDriver={updateDriver} drivers={drivers} />} />
        <Route path="/assign-vehicle" element={<VehicleAssignment drivers={drivers} setDrivers={setDrivers} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
