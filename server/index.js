const express = require('express');
const app = express();
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes');
const droneRoutes = require('./routes/droneRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pilotRoutes = require('./routes/pilotRoutes');
const User = require('./models/userModel')
const DroneInventory = require('./models/droneModel');
const Pilot = require('./models/pilotModel');
const Admin = require('./models/adminModel');

// Middleware to parse JSON data
app.use(express.json());


User.createTable()
DroneInventory.createTable()
Pilot.createTable()
Admin.createTable()
// Routes
app.use('/users', userRoutes);
app.use('/drones', droneRoutes);
app.use('/pilots', pilotRoutes);
app.use('/admin', adminRoutes);
// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
