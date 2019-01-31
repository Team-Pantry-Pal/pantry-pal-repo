const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const handleError = (err) => console.error(err);

// @route    POST api/grocerylist/list
// @desc     Get entire grocery list on page load
// @access   Public
router.post('/list', (req, res) => {
  const user = req.body.user;

  User.findOne({ 'username': user }, 'grocerylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      res.json(result);
    }
  });
});

// @route     POST api/grocerylist
// @desc      Add items to grocery list
// @access    Public
router.post('/', (req, res) => {
  const newItems = req.body.newItems;
  const user = req.body.user;

  User.findOne({ 'username': user }, 'grocerylist', (err, result) => {
    let newCount = 0;
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err)
    } else {
      newItems.forEach((item) => {
        result.grocerylist.push(item);
        newCount += 1;
      });
      newCount = newCount - newCount * 2;
      const payload = result.grocerylist.slice(newCount);
      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          res.json({
            success: true,
            payload
          });
        }
      });
    }
  });
});

// @route   DELETE api/grocerlist
// @desc    Delete a grocery list item
// @access  Public
router.delete("/", (req, res) => {
  const user = req.body.user;
  const itemId = req.body.itemId;

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
