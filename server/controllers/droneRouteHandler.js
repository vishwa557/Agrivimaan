const express = require('express');
const router = express.Router();
const droneRoutes = require('../routes/droneRoutes');

router.use('/drones', droneRoutes);

module.exports = router;
