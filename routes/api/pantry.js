const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const handleError = (err) => console.error(err);

// @route    POST api/pantrylist/list
// @desc     Get entire pantry list on page load
// @access   Public
router.post('/list', (req, res) => {
  const user = req.body.user;

  User.findOne({ 'username': user }, 'pantrylist', (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    }
    res.json(result);
  });
});

// @route     POST api/pantrylist
// @desc      Add items to pantry list
// @access    Public
router.post('/', (req, res) => {
  const user = req.body.user;
  const newItem = req.body.newItem;
  const shoppingCart = req.body.shoppingCart;
  const source = req.get('referer'); // Gets request URL

  async function getUserData() {
    try {
      const userData = await User.findOne({ username: user });
      // This function takes in the shoppingCart array, and lets you pass in a grocery item to see if it's in the shoppingCart. If it is, it returns true, if not, false.
      if (shoppingCart !== undefined) {
        const shoppingCartChecker = (shoppingCart, groceryItem) => {
          const groceryItemId = groceryItem._id.toString(); // Apparently, Mongo doesn't want to let you change the query results into a string (had to store the string value in a new const)
          for (let i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i]._id === groceryItemId) {
              return true;
            }
          }
          return false;
        };

        const newGroceryList = userData.grocerylist.filter((grocery) => {
          // We can use the shoppingCartChecker function in here and pass it the current grocery item from the filter method.
          if (shoppingCartChecker(shoppingCart, grocery)) {
            // If the shoppingCartChecker function returns true, we'll have the filter method return false, thereby NOT putting that grocery item onto the newGroceryList.
            return false;
          }
          return true;
        });

        // Update grocerylist and pantrylist before saving to Mongo
        userData.grocerylist = newGroceryList;
        userData.pantrylist = userData.pantrylist.concat(shoppingCart);
      }
      if (newItem !== undefined) { // If item was added from pantry list...
        // Update pantrylist before saving to Mongo
        userData.pantrylist = userData.pantrylist.concat(newItem);
      }

      async function saveUserData() {
        try {
          const savedData = await userData.save();
          const regex = /grocerylist$/; // RegEx to check if URL ends with "grocerylist"
          if (regex.test(source) === true) { // If req came from shopping cart...
            res.json({ success: true });
          } else { // If request is coming from PantryList...
            const payload = {
              addedItem: savedData.pantrylist[savedData.pantrylist.length - 1],
              success: true
            };
            res.json(payload);
          }
        }
        catch (err) {
          res.status(404).json({ success: false });
          console.error(err);
        }
      }
      saveUserData();
    }
    catch (err) {
      res.status(404).json({ success: false });
      console.error(err);
    }
  }
  getUserData();
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
    }
    result.pantrylist.id(itemId).remove();
    result.save(err => {
      if (err) {
        res.status(404).json({ success: false });
        return handleError(err);
      }
      console.log('item DELETED successfully');
      res.json({ success: true });
    })
  });
});

module.exports = router;