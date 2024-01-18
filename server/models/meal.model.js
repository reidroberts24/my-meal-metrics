const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, "Please add a name/description"]
  },
  calories: {
    type: Number,
    required: [true, "Please add the calories"]
  },
  fat: {
    type: Number,
    required: [true, "Please add the fat content (grams)"]
  },
  carbs: {
    type: Number,
    required: [true, "Please add the carb content (grams)"]
  },
  protein: {
    type: Number,
    required: [true, "Please add the protein content (grams)"]
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

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
