const express = require("express");
const bodyParser = require("body-parser");
// Passport dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local"); // required to call req.logout()
const User = require("../../models/User");

const app = express();

//islogged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//Logic for registering a user
app.post("/signup", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log("something happended");
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("HOORAY! YOU'RE AUTHENTICATED!!!")
        console.log(user);
        res.json(user);
      });
    }
  });
});

//login logic
app.post("/login",
  passport.authenticate("local"), function(req, res) {
    console.log(req.user);
    res.json(req.user);
  }
);

/*
// **MAYBE*** For user session verification on <PrivateRoutes />
app.get("/user", (req, res) => {
  if (req.user) {
    console.log("req.user is TRUE");
    return res.status(200).json({
      user: req.user,
      authenticated: true
    });
  } else {
    console.log("req.user is FALSE");
    return res.status(401).json({
      error: 'User is not authenticated',
      authenticated: false
    });
  }
});
*/

//logout logic
app.post("/logout", function(req, res) {
  console.log("user/auth/logout works");
  req.logout(); // requires passport-local be imported
  res.send({ msg: 'logging out' });
});

module.exports = app;
