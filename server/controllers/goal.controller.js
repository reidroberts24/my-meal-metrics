const Goal  = require('../models/goal.model')

module.exports.addGoals = (req, res) => {
    const goalInfo = req.body
    goalInfo.userId = req.userId
    console.log(goalInfo)

    Goal.create(goalInfo)
        .then( goal => res.json(goal))
        .catch( err => res.json(err))
}

module.exports.getUserGoals = (req, res) => {
    Goal.find({ userId: req.userId} ) 
        .then( goal => res.json(goal) )
        .catch( err => res.json(err) )
}

module.exports.updateGoals = (req, res) => {
    Goal.findOneAndUpdate(
        { userId: req.userId },
        req.body,
        { new: true, runValidators: true }
    )
    .then(updatedGoal => res.json(updatedGoal))
    .catch(err => res.json(err));
};

module.exports.deleteGoals = (req, res) => {
    Goal.findOneAndDelete({userId: req.userId})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}