const express = require("express");
const router = express.Router();
const GroceryItem = require("../../models/GroceryItem");

// @route    GET api/grocerylist
// @desc     Get entire grocery list
// @access   Public
router.get("/", (req, res) => {
  GroceryItem.find({}) // .find() returns a promise, so we can chain it with .then()
    .then(grocerylist => res.json(grocerylist));
});

// @route     POST api/grocerylist
// @desc      Add item to grocery list
// @access    Public
router.post("/", (req, res) => {
  // req.body.quantity = parseInt(req.body.quantity);
  let addedGroceryItem = req.body;
  console.log(addedGroceryItem);

  GroceryItem.create(addedGroceryItem, (err, newGroceryItem) => {
    if (err) {
      console.log("There was an error saving...");
      console.log(err);
    } else {
      console.log("The data was saved successfully!!!");
      console.log(res);
      res.json(newGroceryItem);
    }
  });
});

// @route   DELETE api/grocerlist
// @desc    Deleve a grocery list item
// @access  Public
router.delete("/:id", (req, res) => {
  GroceryItem.findById(req.params.id)
    .then(groceryItem =>
      groceryItem.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
