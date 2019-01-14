const express = require("express");
const router = express.Router();
const request = require("request");
const keys = require("../../config/keys");

router.post("/", (req, res) => {
  let searchString;
  inputVal = req => {
    // Process user input for API query string
    let searchInput = req.body.ingredients;
    // Split the input string into an array
    searchInput = searchInput.split(", ");
    // Trim any errant white space from beg/end of search terms
    searchInput.forEach(ing => {
      ing = ing.replace(/^\s+|\s+$/g, "");
    });
    // Concat array back into string
    searchString = searchInput.join();
  };

  inputVal(req);

  const recipeRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${searchString}&number=3`,
    headers: {
      "X-RapidAPI-Key": keys.rapidApiKey
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      const returnData = JSON.parse(body);
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
  const recipeId = req.body.idNumber;
  const recipeDetailsRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information?includeNutrition=false`,
    headers: {
      "X-RapidAPI-Key": keys.rapidApiKey
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      const returnData = JSON.parse(body);
      res.json(returnData);
    }
  };

  request(recipeDetailsRequest, callback);
});

//route for random recipes
router.get("/random", (req, res) => {
  //make request to API
  const options = {
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
    headers: {
      "X-RapidAPI-Key": keys.rapidApiKey
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      //figure out how to send response
      res.json(info);
    }
  }

  request(options, callback);
});

// This one is for the Spoonacular autocomplete call
// from the AutoComp component.
router.post("/autocomp", (req, res) => {
  const inputValue = req.body.inputValue;
  const rapidCall = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?&number=10&query=${inputValue}`,
    headers: {
      "X-RapidAPI-Key": keys.rapidApiKey
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      const returnData = JSON.parse(body);
      res.json(returnData);
    }
  };

  request(rapidCall, callback);
});

module.exports = router;
