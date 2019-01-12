const express = require("express");
const router = express.Router();
const request = require("request");
const keys = require("../../config/keys");

router.post("/", (req, res) => {
  // Process user input for API query string
  let searchInput = req.body.ingredients;
  console.log(searchInput);

  // Split the input string into an array
  searchInput = searchInput.split(", ");
  console.log(searchInput);

  // Trim any errant white space from beg/end of search terms
  searchInput.forEach(ing => {
    ing = ing.replace(/^\s+|\s+$/g, "");
  });
  console.log(searchInput);

  // Concat array back into string
  var searchString = searchInput.join();
  console.log(searchString);

  let recipeRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${searchString}&number=3`,
    headers: {
      "X-RapidAPI-Key": keys.rapidApiKey
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      var returnData = JSON.parse(body);
      res.json(returnData);
    } else if (err) {
      res.status(404).json({ success: false });
      console.error(err);
    }
  };

  request(recipeRequest, callback);
});

// route for recipe details
router.post("/recipedetails", (req, res) => {
  // Process user input for API query string
  let recipeId = req.body.idNumber;
  let recipeDetailsRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information?includeNutrition=false`,
    headers: {
      "X-RapidAPI-Key": keys.rapidApiKey
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      var returnData = JSON.parse(body);
      res.json(returnData);
    }
  };

  request(recipeDetailsRequest, callback);
});

//route for random recipes
router.get("/random", (req, res) => {
  console.log("connection good!");
  //access api key in env variables
  console.log(process.env.pantrypal_rapidApiKey);
  const api_key = process.env.pantrypal_rapidApiKey;
  //make request to API
  const options = {
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
    headers: {
      "X-RapidAPI-key": api_key
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      //figure out how to send response
      res.json(info);
    }
  }

  const otherResponse = request(options, callback);
});

// This one is for the Spoonacular autocomplete call
// from the AutoComp component
router.post("/autocomp", (req, res) => {
  const inputValue = req.body.inputValue;
  console.log(inputValue);
  const rapidCall = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?&number=10&query=${inputValue}`,
    headers: {
      "X-Rapid-API-Key": keys.rapidApiKey
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      var returnData = JSON.parse(body);
      res.json(returnData);
    }
  };

  request(rapidCall, callback);
});

module.exports = router;
