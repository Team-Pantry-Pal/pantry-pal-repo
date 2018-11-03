let grocerylist = [
  {
    name: "Scooby snacks",
    quantity: 1,
    unitOm: "unit",
    _id: "5bc7fc8c8412a2328418875d"
  },
  {
    name: "baby bell peppers",
    quantity: 12,
    unitOm: "ounces",
    _id: "5bda2268d3d2143d60084d94"
  },
  {
    name: "corn bread",
    quantity: 8,
    unitOm: "ounces",
    _id: "5bda2268d3d2143d60084d95"
  },
  {
    name: "queso fresco",
    quantity: 3,
    unitOm: "Tbsps",
    _id: "5bda2268d3d2143d60084d96"
  }
];

let newItems = [
  {
    name: "Scooby snacks",
    quantity: 1,
    unitOm: "unit",
    _id: "5bc7fc8c8412a2328418875d"
  },
  {
    name: "corn bread",
    quantity: 8,
    unitOm: "ounces",
    _id: "5bda2268d3d2143d60084d95"
  }
];

// This function takes in the newItems array, and lets you pass in a grocery item to see if it's on the newItems list. It it is, it returns true, if not--false.
const newItemsCheck = (newItems, groceryitem) => {
  for (let i = 0; i < newItems.length; i++) {
    if (newItems[i]._id === groceryitem._id) {
      console.log(`newItem ID is a ${typeof newItems[i]._id}`);
      console.log(`groceryitem ID is a ${typeof groceryitem._id}`);
      return true;
    }
  }
  return false;
};

const newGroceryList = grocerylist.filter((grocery) => {
  // We can use the newItemsCheck function in here to pass it the current grocery item from the filter method.
  if (newItemsCheck(newItems, grocery)) {
    // If the newItemsCheck function returns true, we'll have the filter method return false, thereby NOT putting that grocery item onto the newGroceryList.
    return false;
  }
  return true;
});

console.log(newGroceryList);