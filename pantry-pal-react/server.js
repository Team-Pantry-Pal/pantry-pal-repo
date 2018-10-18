const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const db = require("./config/keys").mongoURI;
const mLab = require('./config/keys').mLab;
const passport = require("./config/passport-setup");
// import routes
const groceryRouter = require("./routes/api/groceryList");
const searchRouter = require('./routes/api/recipe-search');
const pantryRouter = require('./routes/api/pantry');
const favRouter = require('./routes/api/fav-recipes');
const passportRoutes = require('./routes/api/passportRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(mLab, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.error(err));

app.use(express.static('public'));
// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// set up Express session
app.use(require("express-session")({
  secret: "blah blah blah",
  resave: false,
  saveUninitialized: false
}));
// initialize Passport
app.use(passport.initialize());
// necessary to use persistent login sessions
app.use(passport.session()); // make sure express-session is called first
// initialize routes
app.use("/user/:id/api/grocerylist", groceryRouter);
app.use('/user/:id/api/recipe-search', searchRouter); // search from /user page
app.use('/user/api/recipe-search', searchRouter); // search from /user page
app.use('/api/recipe-search', searchRouter); // search from Welcomage page
app.use('/user/:id/api/pantry', pantryRouter);
app.use('/user/:id/api/fav-recipes', favRouter);
app.use("/user/:id/auth", passportRoutes);
app.use("/user/auth", passportRoutes);
app.use("/auth", passportRoutes);

const port = process.env.PORT || 5000; // "process.env.PORT" is for when we deploy to Heroku
app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});