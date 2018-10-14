const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PantrySchema = new Schema({
  name: {
    type: String
    //required: [true, "Pantry item name is required"]
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

module.exports = PantrySchema;
