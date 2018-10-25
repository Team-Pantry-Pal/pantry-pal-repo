const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", (req, res) => {
  let user = req.body.user;
  let recipeRequest = {
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random&number=3`,
    headers: {
      "X-Mashape-Key": "oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ",
      Accept: "applicaton/json"
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

module.exports = router;
