const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Passport dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const groceryRouter = require("./routes/api/groceryList");
const searchRouter = require('./routes/api/recipe-search');
const pantryRouter = require('./routes/api/pantry');
const passportRoutes = require('./routes/api/passportRoutes');

const app = express();

// bodyParser middleware
app.use(bodyParser.json());

const User = require('./models/User');
app.use(require("express-session")({
  secret: "blah blah blah",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));

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
app.use('/api/pantry', pantryRouter);
app.use("/auth", passportRoutes);

const port = process.env.PORT || 5000;
// "process.env.PORT" is for when we deploy to Heroku

app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});
