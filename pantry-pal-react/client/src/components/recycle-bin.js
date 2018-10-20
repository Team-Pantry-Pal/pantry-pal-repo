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

