const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrocerySchema = new Schema({
  name: {
    type: String
    //required: [true, "Food item name is required"]
  },
  spoonId: {
    type: Number
  },
  qty: {
    type: Number,
    default: 1
  },
  unit: {
    type: String
  },
  recipeId: {
    type: Number
  }
});

module.exports = GrocerySchema;