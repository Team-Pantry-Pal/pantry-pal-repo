const express = require("express");
const router = express.Router();
const request = require("request");

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
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${searchString}&number=3`,
    headers: {
      "X-Mashape-Key": "oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ",
      "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
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

//route for recipe details
router.post("/recipedetails", (req, res) => {
  // Process user input for API query string
  let recipeId = req.body.idNumber;
  let recipeDetailsRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?includeNutrition=false`,
    headers: {
      "X-Mashape-Key": "oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ",
      "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
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
  //make request to API
  const options = {
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
    headers: {
      "X-RapidAPI-key": "aFG7BBsiy0mshBjk8nF6pllxvS2Rp1TQ9BujsnBxaotUfeEKk9"
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      //figure out how to send response
    }
  }

  const otherResponse = request(options, callback);
});

module.exports = router;
