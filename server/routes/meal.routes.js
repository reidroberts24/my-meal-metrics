// meal.routes.js

const mealController = require('../controllers/meal.controller');
const { authenticate } = require('../config/jwt.config'); // Import the authenticate middleware

module.exports = (app) => {
  app.post('/api/meals/', authenticate, mealController.addMeal); // Add a new meal with userId
  app.get('/api/meals/', authenticate, mealController.getAllMeals); // Get all meals for a specific user
  app.get('/api/meals/:id', authenticate, mealController.getOneMeal); // Get a single meal by ID for a specific user
  app.patch('/api/meals/:id', authenticate, mealController.updateMeal); // Update a meal by ID for a specific user
  app.delete('/api/meals/:id', authenticate, mealController.deleteMeal); // Delete a meal by ID for a specific user
};
