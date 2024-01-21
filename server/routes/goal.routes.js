const goalController = require('../controllers/goal.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
  app.post('/api/goals/', authenticate, goalController.addGoals); 
  app.get('/api/goals/', authenticate, goalController.getUserGoals); 
  app.patch('/api/goals/:id', authenticate, goalController.updateGoals); 
  app.delete('/api/goals/:id', authenticate, goalController.deleteGoals); 
};
