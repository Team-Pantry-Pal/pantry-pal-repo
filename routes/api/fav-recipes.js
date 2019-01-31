const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const handleError = (err) => console.error(err);

// @route     POST api/fav-recipes
// @desc      Retrieve list of favs on page load
// @access    Public
router.post('/', (req, res) => {
  const user = req.body.user;

  User.findOne({ 'username': user }, 'favRecipes', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      res.json(result);
    }
  });
});

// @route     POST api/fav-recipes
// @desc      Add new recipe to favs
// @access    Public
router.post('/addfav', (req, res) => {
  const user = req.body.user;
  const newFav = req.body.newFav;

  User.findOne({ 'username': user }, 'favRecipes', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      result.favRecipes.push(newFav);
      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          res.json({ success: true });
        }
      });
    }
  });
});

// @route   DELETE api/fav-recipes
// @desc    Delete a recipe from favorites
// @access  Public
router.delete('/', (req, res) => {
  const user = req.body.user;
  const recipeId = req.body.recipeId;

  User.findOne({ 'username': user }, 'favRecipes', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      console.log(result.favRecipes.id(recipeId));
      result.favRecipes.id(recipeId).remove();
      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          console.log('---Recipe DELETED---');
          res.json({ success: true });
        }
      })
    }
  });
});

module.exports = router;