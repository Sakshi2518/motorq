const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleId: {
      type: String,
      required: true,
      unique: true,
    },
    makeModel: {
      type: String,
      required: true,
    },
    assigned: {
      type: Boolean,
      default: false,
    },
  });
  
  const Vehicle = mongoose.model('Vehicle', vehicleSchema);
  
  module.exports = Vehicle;
  