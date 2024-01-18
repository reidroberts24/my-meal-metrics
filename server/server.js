const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const databaseUri = process.env.DATABASE_URI;
const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT || 8000;

const mealRoutes = require('./routes/meal.routes');
const userRoutes = require('./routes/user.routes');
const app = express();

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('MyMealMetrics Backend is running!');
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});


// Use your imported routes
app.use('/api', mealRoutes);
app.use('/api', userRoutes);

