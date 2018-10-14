const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// @route     POST api/fav-recipes
// @desc      Retrieve list of favs on page load
// @access    Public
router.post('/', (req, res) => {
  let user = req.body.user;

  User.findOne({ 'username': user }, 'favRecipes', (err, result) => {
    if (err) {
      console.log('ERROR');
      return handleError(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

// @route     POST api/fav-recipes
// @desc      Add new recipe to favs
// @access    Public
router.post('/addfav', (req, res) => {
  let user = req.body.user;
  let newFav = req.body.newFav;

  User.findOne({ 'username': user }, 'favRecipes', (err, result) => {
    if (err) {
      return handleError(err)
    } else {
      result.favRecipes.push(newFav);
      result.save(err => {
        if (err) {
          res.send({ success: false });
          return handleError(err);
        } else {
          res.send({ success: true });
        }
      });
    }
  });
});

module.exports = router;