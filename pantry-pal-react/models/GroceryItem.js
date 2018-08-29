const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrocerySchema = new Schema({
  name: {
    type: String,
    required: [true, "Food item name is required"]
  },
  quantity: {
    type: Number,
    default: 1
  },
  unitOm: {
    type: String,
    default: "unit"
  }
});

const GroceryItem = mongoose.model("groceryItem", GrocerySchema);

module.exports = GroceryItem;
