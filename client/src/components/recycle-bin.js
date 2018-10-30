var searchInput = "chicken    ,                             baked beans, corn on the cob";

// Split the input sting into an array
searchInput = searchInput.split(", ");
console.log(searchInput);

// Trim any errant white space from beg/end of search term
searchInput.forEach((ing, i, array) => {
	array[i] = ing.replace(/^\s+|\s+$/g, '');
});
console.log(searchInput);

// Replace spaces btwn words in search term w/ "+"
searchInput.forEach((ing, i, array) => {
	array[i] = ing.replace(/\s/g, "+");
});
console.log(searchInput);


// Potential object to how auth info
auth = {
  isAuth: false,
  authenticate() {
    fetch('auth/user', {
      credentials: 'include'
    })
    .then(res => {
      this.isAuth = true;
      console.log(res);
      console.log(this.isAuth);
    })
    .catch(err => console.log('Error fetching authorized user.', err))
  }
};


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
        res.json(payload);
      }
    });
  }
});

pantrySearch = (e) => {
  e.preventDefault();
  let { pantrySelections, pantryCheckbox } = this.state;
  let searchData = { ingredients: pantrySelections.toString() };
  fetch('api/recipe-search', {
    method: 'POST',
    body: JSON.stringify(searchData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(results => this.setState({ searchResults: results }))
    .catch(err => console.error(err.message));
  console.log(pantryCheckbox);
  // Clear all checkboxes
};

handleTick = (event) => {
  let target = event.target;
  let pantrySelections = [...this.state.pantrySelections];
  let pantryCheckbox = { ...this.state.pantryCheckbox };
  let checkStatus = {
    pantryItem: target.value,
    checked: target.checked
  };
  if(target.checked) {
    // Add checked item to pantrySelections array
    pantrySelections.push(target.value);
    this.setState({ pantrySelections });
    console.log(pantrySelections);
    // Track PantryItem's checked status in state
    pantryCheckbox[target.id] = checkStatus;
    this.setState({ pantryCheckbox });
  } else if (!target.checked) {
    // Remove the target.value from pantrySelections
    pantrySelections = pantrySelections.filter(name => name !== target.value);
    delete pantryCheckbox[target.id];
    this.setState({ pantrySelections, pantryCheckbox });
  }
};