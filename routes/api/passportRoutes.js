const express = require("express");
const User = require("../../models/User");
// Passport dependencies
const passport = require("passport");
// required to call req.logout()
const LocalStrategy = require("passport-local");

const app = express();

// islogged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Logic for registering a user
app.post("/signup", function(req, res) {
  console.log(req.body);
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      res.status(404).json({ success: false });
      console.error(err);
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
    // console.log(req.user);
    res.json(req.user);
  }
);

//logout logic
app.post("/logout", function(req, res) {
  req.logout(); // requires passport-local be imported
  res.json({ msg: 'logging out' });
});

module.exports = app;
