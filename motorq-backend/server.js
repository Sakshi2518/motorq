const express = require('express');
const cors = require('cors');
const connectDB = require('./DriversDB');  // Use the correct path to DriversDB.js
const Driver = require('./Drivers'); // Import your Driver model
const Vehicle = require('./Vehicles'); // Import your Vehicle model
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the MotorQ Backend!');
});

// Route to add a new driver
app.post('/add-driver', async (req, res) => {
    try {
      const { driverID, name, email, phone } = req.body;
  
      const newDriver = new Driver({
        driverID,
        name,
        email,
        phone
      });
  
      await newDriver.save();
      res.status(201).send('Driver added successfully');
    } catch (err) {
      console.error(err.message); // Log the error for debugging
      res.status(500).send('Error adding driver');
    }
});

// Route to get all drivers with their assigned vehicle details
app.get('/drivers', async (req, res) => {
    try {
      const drivers = await Driver.find().populate('vehicleAssigned');
      res.status(200).json(drivers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching drivers');
    }
});

// Route to update driver details
app.put('/update-driver/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
  
      const updatedDriver = await Driver.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true } // Return the updated document
      );
  
      if (!updatedDriver) {
        return res.status(404).send('Driver not found');
      }
  
      res.status(200).send('Driver updated successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error updating driver');
    }
});

  
// Route to delete a driver
app.delete('/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const driver = await Driver.findById(id);
        if (!driver) return res.status(404).send('Driver not found');

        // Unassign the vehicle if the driver is being deleted
        if (driver.vehicleAssigned) {
            const vehicle = await Vehicle.findById(driver.vehicleAssigned);
            if (vehicle) {
                vehicle.assigned = false;
                await vehicle.save();
            }
        }

        await Driver.findByIdAndDelete(id);
        res.status(200).send('Driver deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error deleting driver');
    }
});


// Route to get all vehicles
app.get('/vehicles', async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).send('Error fetching vehicles');
    }
});

app.post('/assign-vehicle/:driverID', async (req, res) => {
    try {
        const { vehicleId } = req.body;
        const { driverID } = req.params;

        const driver = await Driver.findOne({ driverID });
        const vehicle = await Vehicle.findOne({ vehicleId });

        if (!driver) return res.status(404).send('Driver not found');
        if (!vehicle) return res.status(404).send('Vehicle not found');
        
        if (vehicle.assigned) return res.status(400).send('Vehicle already assigned');

        if (driver.vehicleAssigned) {
            const oldVehicle = await Vehicle.findOne({ vehicleId: driver.vehicleAssigned });
            if (oldVehicle) {
                oldVehicle.assigned = false;
                await oldVehicle.save();
            }
        }

        driver.vehicleAssigned = vehicleId;
        vehicle.assigned = true;

        await driver.save();
        await vehicle.save();

        res.status(200).send('Vehicle assigned successfully');
    } catch (error) {
        console.error('Error assigning vehicle:', error.message);
        res.status(500).send('Error assigning vehicle');
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
