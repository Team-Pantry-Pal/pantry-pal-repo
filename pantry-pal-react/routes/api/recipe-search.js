const express = require("express");
const router = express.Router();
const request = require('request');

router.post('/', (req, res) => {
  let searchIngredient = req.body.ingredient;
  console.log(searchIngredient);

  let recipeRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${searchIngredient}&number=3`,
    headers: {
      'X-Mashape-Key': 'oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ',
      'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    }
  };

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      var returnData = JSON.parse(body);
      console.log(returnData);
      res.json(returnData);
    }
  };

  request(recipeRequest, callback);

});

module.exports = router;