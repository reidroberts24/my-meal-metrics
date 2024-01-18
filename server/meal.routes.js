const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController'); // Adjust path as needed

// POST route for adding a new meal
router.post('/meals', mealController.addMeal);

// GET route for getting all meals
router.get('/meals', mealController.getAllMeals);

// GET route for getting a single meal by ID
router.get('/meals/:id', mealController.getOneMeal);

// PUT route for updating a meal by ID
router.put('/meals/:id', mealController.updateMeal);

// DELETE route for deleting a meal by ID
router.delete('/meals/:id', mealController.deleteMeal);

module.exports = router;