const express = require("express");
const router = express.Router();
const request = require('request');

router.post('/', (req, res) => {
  // Process user input for API query string
  let searchInput = req.body.ingredients;
  console.log(searchInput);

  // Split the input sting into an array
  searchInput = searchInput.split(", ");
  console.log(searchInput);

  // Trim any errant white space from beg/end of search terms
  searchInput.forEach((ing, i, array) => {
    array[i] = ing.replace(/^\s+|\s+$/g, '');
  });
  console.log(searchInput);

  // Concat array back into string
  var searchString = searchInput.join();
  console.log(searchString);

  let recipeRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${searchString}&number=3`,
    headers: {
      'X-Mashape-Key': 'oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ',
      'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      var returnData = JSON.parse(body);
      res.json(returnData);
    }
  };

  request(recipeRequest, callback);

});

//route for recipe details
router.post('/recipedetails', (req, res) => {
  // Process user input for API query string
  let recipeId = req.body.idNumber;
  let recipeDetailsRequest = {
    url:
    `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeId}/information?includeNutrition=false`,
    headers: {
      'X-Mashape-Key': 'oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ',
      'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
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

module.exports = router;