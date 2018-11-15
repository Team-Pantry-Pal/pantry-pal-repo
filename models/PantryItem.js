const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PantrySchema = new Schema({
  name: {
    type: String
    //required: [true, "Pantry item name is required"]
  },
  qty: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: "unit"
  }
});

module.exports = PantrySchema;
