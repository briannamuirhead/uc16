
// Displays an error message when the search criteria does not find anything in the data source.
QUnit.test( "Displays an error message", function( assert ) {

    findWeather("gg");
    assert.equal(document.getElementById("weather").value, "There is no city found with that name.", "Passed - Expected 0.2");
});
