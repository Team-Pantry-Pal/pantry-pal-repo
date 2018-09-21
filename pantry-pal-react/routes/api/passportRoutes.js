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
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/newsfeed",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//logout logic
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = app;
