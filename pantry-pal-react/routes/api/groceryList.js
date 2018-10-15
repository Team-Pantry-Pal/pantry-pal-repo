const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const handleError = (err) => console.error(err);

// @route    POST api/grocerylist/list
// @desc     Get entire grocery list on page load
// @access   Public
router.post('/list', (req, res) => {
  let user = req.body.user;

  User.findOne({ 'username': user }, 'grocerylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      //console.log(result);
      res.json(result);
    }
  });
});

// @route     POST api/grocerylist
// @desc      Add item to grocery list
// @access    Public
router.post('/', (req, res) => {
  let newItem = req.body.name;
  let user = req.body.user;

  User.findOne({ 'username': user }, 'grocerylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err)
    } else {
      result.grocerylist.push(newItem);
      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          res.json(result.grocerylist[result.grocerylist.length - 1]);
        }
      });
    }
  });
});

// @route   DELETE api/grocerlist
// @desc    Delete a grocery list item
// @access  Public
router.delete("/", (req, res) => {
  let user = req.body.user;
  let itemId = req.body.itemId;

  User.findOne({ 'username': user }, 'grocerylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      result.grocerylist.id(itemId).remove();
      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          console.log('item DELETED successfully');
          res.json({ success: true });
        }
      })
    }
  });
});

module.exports = router;
