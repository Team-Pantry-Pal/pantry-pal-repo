// Using promises
router.post('/', (req, res) => {
  const user = req.body.user;
  const shoppingCart = req.body.shoppingCart;
  const source = req.get('referer');

  User.findOne({ username: user })
    .select({ pantrylist: 1, grocerylist: 1 })
    .then(result => {
      const shoppingCartChecker = (shoppingCart, groceryItem) => {
        const groceryItemId = groceryItem._id.toString();
        for (let i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i]._id === groceryItemId) {
            return true;
          }
        }
        return false;
      };

      const newGroceryList = result.grocerylist.filter((grocery) => {
        if (shoppingCartChecker(shoppingCart, grocery)) {
          return false;
        }
        return true;
      });

      result.grocerylist = newGroceryList;
      result.pantrylist = result.pantrylist.concat(shoppingCart || newItem);

      result.save()
        .then(result => {
          const regex = /grocerylist$/;
          if (regex.test(source) === true) {
            res.json({ success: true });
          } else {
            const payload = {
              addedItem: result.pantrylist[result.pantrylist.length - 1],
              success: true
            };
            res.json(payload);
          }
        })
        .catch(err => {
          res.status(404).json({ success: false });
          console.error(err);
        });
    })
    .catch(err => {
      res.status(404).json({ success: false });
      console.error(err);
    });
});

// Using callbacks
router.post('/', (req, res) => {
  const user = req.body.user;
  const shoppingCart = req.body.shoppingCart;
  let newItem = req.body.newItem;
  const source = req.get('referer'); // Gets request URL

  User.findOne({ username: user }, (err, result) => {
    if (err) {
      res.status(404).json({ success: false });
      return handleError(err);
    } else {
      // This function takes in the shoppingCart array, and lets you pass in a grocery item to see if it's in the shoppingCart. If it is, it returns true, if not, false.
      const shoppingCartChecker = (shoppingCart, groceryItem) => {
        const groceryItemId = groceryItem._id.toString(); // Apparently, Mongo doesn't want to let you change the query results into a string (had to store the string value in a new const)
        for (let i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i]._id === groceryItemId) {
            return true;
          }
        }
        return false;
      };

      const newGroceryList = result.grocerylist.filter((grocery) => {
        // We can use the shoppingCartChecker function in here and pass it the current grocery item from the filter method.
        if (shoppingCartChecker(shoppingCart, grocery)) {
          // If the shoppingCartChecker function returns true, we'll have the filter method return false, thereby NOT putting that grocery item onto the newGroceryList.
          return false;
        }
        return true;
      });

      result.grocerylist = newGroceryList;
      result.pantrylist = result.pantrylist.concat(shoppingCart || newItem);

      result.save(err => {
        if (err) {
          res.status(404).json({ success: false });
          return handleError(err);
        } else {
          const regex = /grocerylist$/; // RegEx to check if URL ends with "grocerlist"
          if (regex.test(source) === true) { // If req came from shopping cart...
            res.json({ success: true });
          } else { // If request is coming from PantryList...
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