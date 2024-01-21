const Users = require('../controllers/user.controller'); // Adjust path as needed
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/users/register', Users.register); // POST route for user registration
    app.post('/api/users/login', Users.login)
    app.post('/api/users/logout', Users.logout)
    app.patch('/api/users/updategoals', Users.updateDailyGoals)
    app.get('/api/users', authenticate, Users.getUsers) //get list of users (for testing mainly)
    app.delete('api/users/deletegoals', Users.deleteDailyGoals)
}
// Add more user-related routes as needed, e.g., login, update profile, etc.