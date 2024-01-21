const goalController = require('../controllers/goal.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post('/api/goals/', authenticate, goalController.addGoals); // Add a new goal
  app.get('/api/goals/', authenticate, goalController.getUserGoals); // Get goals for a specific user
  app.patch('/api/goals/:id', authenticate, goalController.updateGoals); // Update a specific goal by ID
  app.delete('/api/goals/:id', authenticate, goalController.deleteGoals); // Delete a specific goal by ID
};
