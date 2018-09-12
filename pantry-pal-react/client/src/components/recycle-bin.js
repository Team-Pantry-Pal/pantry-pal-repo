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

// Bootstrap 3 and jQuery CDNs
/*
		<!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
      crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
			crossorigin="anonymous"></script>
*/