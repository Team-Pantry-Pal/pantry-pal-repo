const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavSchema = new Schema({
  servings: Number,
  extendedIngredients: [],
  id: Number,
  title: String,
  readyInMinutes: Number,
  image: String,
  instructions: String
});

module.exports = FavSchema;