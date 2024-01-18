const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/my_meal_metrics', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the "product_manager" database'))
    .catch(err => console.log('An error occurred connecting to the database. ', err));