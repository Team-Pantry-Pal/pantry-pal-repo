const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const groceryRouter = require("./routes/api/groceryList");
const searchRouter = require('./routes/api/recipe-search');
const pantryRouter = require('./routes/api/pantry');

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
app.use('/api/pantry', pantryRouter);

const port = process.env.PORT || 5000;
// "process.env.PORT" is for when we deploy to Heroku

app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});


//code for passport local
const passport = require("passport");
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose");
//bring in user schema
const User = require("./models/user");

app.use(require("express-session")({
  secret: "blah blah blah",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//store user id in session
passport.serializeUser(User.serializeUser());
//grab user object from database
passport.deserializeUser(User.deserializeUser());

//connect to mongo and set up body parser
mongoose.connect("mongodb://localhost/passport_demo");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("home.ejs");
});

//route to signup page
app.get("/signup", function(req, res){
  res.render("signup.ejs");
});

//islogged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

//login route
app.get("/login", function(req, res) {
	res.render("login.ejs");
});

//Should not be able to see newsfeed unless user is logged in
app.get("/newsfeed", isLoggedIn, function (req, res){
  res.render("newsfeed.ejs");
});

//Logic for registering a user
app.post("/signup", function(req, res) {
  var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("signup.ejs")
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/newsfeed");
			});
		}
	})
});

//login logic
app.post('/login', passport.authenticate('local',
	{
		successRedirect: '/newsfeed',
		failureRedirect: '/login'
	}), function(req, res){
});

//logout logic
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
})