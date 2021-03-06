const express = require("express");
const mongoose = require("mongoose");
//const mongoD = require("./config/keys").mongoURI;
const mLab = require("./config/keys").mLab;
const passport = require("./config/passport-setup");
const path = require("path");
// Production middleware
const helmet = require("helmet");
const compression = require("compression");
// Import routes
const groceryRouter = require("./routes/api/groceryList");
const searchRouter = require("./routes/api/recipe-search");
const pantryRouter = require("./routes/api/pantry");
const favRouter = require("./routes/api/fav-recipes");
const passportRoutes = require("./routes/api/passportRoutes");

const app = express();

// Database switch (Local Mongo or mLab)
let db;
if (typeof mongoD === "undefined") {
  db = mLab;
} else if (typeof mLab === "undefined") {
  db = mongoD;
}
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.error(err));

app.use(express.static("public"));
// Express JSON-parsing middleware
app.use(express.json());
// Set up Express session
app.use(
  require("express-session")({
    secret: "blah blah blah",
    resave: false,
    saveUninitialized: false
  })
);
// Initialize Passport
app.use(passport.initialize());
// Necessary to use persistent login sessions
app.use(passport.session()); // make sure express-session is called first
// Initialize routes
app.use("/:user/api/grocerylist", groceryRouter);
app.use("/:user/api/recipe-search", searchRouter);
app.use("/:user/api/pantry", pantryRouter);
app.use("/:user/api/fav-recipes", favRouter);
app.use("/:user/auth", passportRoutes);
app.use("/auth", passportRoutes);

// For production...
if (process.env.NODE_ENV === "production") {
  // ... reset static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  // ...include production-only middleware (read docs later)
  app.use(helmet());
  app.use(compression());
}

const port = process.env.PORT || 5000; // "process.env.PORT" is for when we deploy to Heroku
app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});