const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driverID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, 
  },
  phone: {
    type: Number, 
    required: true, 
  },
  vehicleAssigned: {
    type: String,
    ref: 'Vehicle'
  },
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
