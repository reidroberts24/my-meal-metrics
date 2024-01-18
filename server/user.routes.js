const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust path as needed

// POST route for user registration
router.post('/users/register', userController.register);

// Add more user-related routes as needed, e.g., login, update profile, etc.

module.exports = router;