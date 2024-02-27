const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

const ServiceRequest = require('../models/ServiceRequest'); // Assuming you have a ServiceRequest model

// Create a service request
router.post('/request', authMiddleware, async (req, res) => {
  try {
    const { serviceDetails } = req.body;

    // Save service request to the database
    const serviceRequest = new ServiceRequest({ userId: req.userId, serviceDetails });
    await serviceRequest.save();

    res.status(201).json({ message: 'Service request created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
