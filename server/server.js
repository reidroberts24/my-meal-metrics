const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors')
const databaseUri = process.env.DATABASE_URI;
const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT || 8000;
const mealRoutes = require('./routes/meal.routes');
const userRoutes = require('./routes/user.routes');
const goalRoutes = require('./routes/goal.routes')
const app = express();

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Update your front-end origin
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('MyMealMetrics Backend is running!');
});

mealRoutes(app); 
userRoutes(app); 
goalRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
