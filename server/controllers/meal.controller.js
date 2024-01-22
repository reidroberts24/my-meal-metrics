const Meal = require('../models/meal.model')

module.exports.addMeal = (req, res) => {
    mealInfo = req.body;
    mealInfo.userId = req.userId;

    Meal.create(mealInfo)
        .then( meal => res.json(meal))
        .catch( err => res.json(err))
}

module.exports.getAllMeals = (req, res) => {
    Meal.find({userId: req.userId})
        .then( allMeals => res.json(allMeals) )
        .catch( err => res.json(err) )
}

module.exports.getOneMeal = (req, res) => {
    Meal.findOne({ _id: req.params.id, userId: req.userId} )
        .then( meal => res.json(meal) )
        .catch( err => res.json(err) )
}

module.exports.updateMeal = (req, res) => {
    Meal.findByIdAndUpdate(
        { _id: req.params.id, userId: req.userId }, // Update a meal by ID for the specific user
        req.body,
        { new: true, runValidators: true }
    )
    .then( updatedMeal => res.json(updatedMeal) )
    .catch( err => res.json(err))
}

module.exports.deleteMeal = (req, res) => {
    Meal.findOneAndDelete({ _id: req.params.id, userId: req.userId }) 
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err))
}