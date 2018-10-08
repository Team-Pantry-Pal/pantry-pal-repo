const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const pantrySchema = require('./PantryItem');
const grocerySchema = require('./GroceryItem');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    pantrylist: [pantrySchema],
    grocerylist: [grocerySchema]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);