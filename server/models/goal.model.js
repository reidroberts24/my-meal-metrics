const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dailyCalories: {
    type: Number,
  },
  dailyFat: {
    type: Number,
  },
  dailyCarbs: {
    type: Number,
  },
  dailyProtein: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Goal = mongoose.model('Goal', goalsSchema);

module.exports = Goal;
