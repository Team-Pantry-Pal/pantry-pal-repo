const express = require("express");
const bodyParser = require("body-parser");
// Passport dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
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

//logout logic
app.post("/logout", function(req, res) {
  console.log("user/auth/logout works");
  req.logout();
  res.send({ msg: 'logging out' });
});

module.exports = app;
