const express = require("express");
const router = express.Router();
const PantryItem = require("../../models/PantryItem");

router.get('/', (req, res) => {
  PantryItem.find({})
    .then(pantrylist => res.json(pantrylist));
});

router.post('/', (req, res) => {
  PantryItem.create(req.body, (err, newPantryItem) => {
    if (err) {
      console.log("There was an error saving...");
      console.log(err);
    } else {
      console.log("The data was saved successfully!!!");
      //console.log(res);
      res.json(newPantryItem);
    }
  });
});

router.delete("/:id", (req, res) => {
  PantryItem.findById(req.params.id)
    .then(pantryItem =>
      pantryItem.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;