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

// Concat array back into string
var searchString = searchInput.join();
console.log(searchString);