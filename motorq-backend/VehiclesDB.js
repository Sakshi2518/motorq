const express = require('express');
const VehiclesDB = express.Router();
const Vehicle = require('./Vehicle');

// Get all vehicles
VehiclesDB.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles); // Use .json() for consistency
  } catch (error) {
    console.error('Error fetching vehicles:', error); // Log the error for debugging
    res.status(500).send('Error fetching vehicles'); // Provide a user-friendly error message
  }
});

module.exports = VehiclesDB;
