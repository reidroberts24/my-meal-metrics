const Meal = require('../models/product.model')

module.exports.addMeal = (req, res) => {
    mealInfo = req.body
    Meal.create(productInfo)
        .then( meal => res.json(meal))
        .catch( err => res.json(err))
}

module.exports.getAllMeals = (req, res) => {
    Meal.find({})
        .then( allMeals => res.json(allMeals) )
        .catch( err => res.json(err) )
}

module.exports.getOneMeal = (req, res) => {
    Meal.findOne({ _id: req.params.id} ) // "_id" is for mongoose. But in req.params.id we can name it whatever we want after params....it just needs to match our route
        .then( meal => res.json(meal) )
        .catch( err => res.json(err) )
}

module.exports.updateMeal = (req, res) => {
    Meal.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then( updatedMeal => res.json(updatedMeal) )
        .catch( err => res.json(err))
}

module.exports.deleteMeal = (req, res) => {
    Meal.findOneAndDelete({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}