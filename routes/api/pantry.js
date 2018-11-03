const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const handleError = (err) => console.error(err);

// @route    POST api/pantrylist/list
// @desc     Get entire pantry list on page load
// @access   Public
router.post('/list', (req, res) => {
  let user = req.body.user;

  User.findOne({ 'username': user }, 'pantrylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      res.json(result);
    }
  });
});

// @route     POST api/pantrylist
// @desc      Add items to pantry list
// @access    Public
router.post('/', (req, res) => {
  let newItems = req.body.newItems;
  const user = req.body.user;
  const source = req.get('referer'); // Gets request URL

  //res.json("Lemme alone! We're testing!!!");

  User.findOne({ username: user }, (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      // This function takes in the newItems array, and lets you pass in a grocery item to see if it's on the newItems list. It it is, it returns true, if not, false.
      const newItemsCheck = (newItems, groceryItem) => {
        const groceryItemId = groceryItem._id.toString(); // Apparently, Mongo doesn't want to let you change the query results into a string (had to store the string value in a new const)
        for (let i = 0; i < newItems.length; i++) {
          if (newItems[i]._id === groceryItemId) {
            return true;
          }
        }
        return false;
      };

      const newGroceryList = result.grocerylist.filter((grocery) => {
        // We can use the newItemsCheck function in here to pass it the current grocery item from the filter method.
        if (newItemsCheck(newItems, grocery)) {
          // If the newItemsCheck function returns true, we'll have the filter method return false, thereby NOT putting that grocery item onto the newGroceryList.
          return false;
        }
        return true;
      });

      result.grocerylist = newGroceryList;
      result.pantrylist = result.pantrylist.concat(newItems);

      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          const regex = /grocerylist$/; // RegEx to check if URL ends with "grocerlist"
          if (regex.test(source) === true) { // If req came from shopping cart
            res.json({ success: true });
          } else { // If request is coming from PantryList
            const payload = {
              addedItem: result.pantrylist[result.pantrylist.length - 1],
              success: true
            };
            res.json(payload);
          }
        }
      });
    }
  });
});

// @route   DELETE api/pantrylist
// @desc    Deleve a pantry list item
// @access  Public
router.delete("/", (req, res) => {
  let user = req.body.user;
  let itemId = req.body.itemId;

  User.findOne({ 'username': user }, 'pantrylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      result.pantrylist.id(itemId).remove();
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