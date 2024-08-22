import React, { useState } from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import './NewDvr.css';

const NewDvr = () => {
  const [driverID, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverID, name, email, phone }),
      });
      navigate('/driver-list');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <form onSubmit={handleSubmit}>
          <div className='dvr-heading'><p>Enter Details</p></div>
          <div className="dvr-details">
            <div className="dvr-flex">
              <p>Driver ID</p>
              <input type="text" onChange={(e) => setId(e.target.value)} value={driverID} placeholder="Enter Driver ID" required />
            </div>
            <div className="dvr-flex">
              <p>Driver Name</p>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Driver Name" required />
            </div>
            <div className="dvr-flex">
              <p>Email</p>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Driver Email" required />
            </div>
            <div className="dvr-flex">
              <p>Phone Number</p>
              <input type="tel" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Enter Phone Number" required />
            </div>
          </div>
          <button type="submit">ADD DRIVER</button>
        </form>
      </div>
    </div>
  );
};

export default NewDvr;
