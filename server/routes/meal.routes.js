const mealController = require('../controllers/meal.controller'); // Adjust path as needed

module.exports = (app) => {
    app.post('/api/meals', mealController.addMeal); // POST route for adding a new meal
    app.get('/api/meals', mealController.getAllMeals); // GET route for getting all meals
    app.get('/api/meals/:id', mealController.getOneMeal); // GET route for getting a single meal by ID;  ":id" needs to match the parameter name in req.params.id <- id matched
    app.put('/api/meals/:id', mealController.updateMeal); // PUT route for updating a meal by ID
    app.delete('/api/meals/:id', mealController.deleteMeal); // DELETE route for deleting a meal by ID

}