const express = require("express");
// Passport dependencies
const passport = require("passport");
const User = require("../../models/User");

const app = express();

//route to signup page
app.get("/signup", function(req, res) {
  res.render("signup.ejs");
});

//islogged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//login route
app.get("/login", function(req, res) {
  res.render("login.ejs");
});

//Should not be able to see newsfeed unless user is logged in
app.get("/newsfeed", isLoggedIn, function(req, res) {
  res.render("newsfeed.ejs");
});

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
