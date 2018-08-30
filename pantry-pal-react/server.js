const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const groceryRouter = require("./routes/api/groceryList");
const searchRouter = require('./routes/api/recipe-search');

const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// Database configuration
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(function() {
    console.log("MongoDB is connected...");
  })
  .catch(function(err) {
    console.log(err);
  });

// Initialize routes
app.use("/api/grocerylist", groceryRouter);
app.use('/api/recipe-search', searchRouter);

const port = process.env.PORT || 5000;
// "process.env.PORT" is for when we deploy to Heroku

app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});
