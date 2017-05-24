/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findRecipe(recipeId) {
    // First get the zip code from the HTML textbox
    var recipe = document.getElementById(recipeId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayFood(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayFood('{ "meal" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "https://api.edamam.com/search?q=" + recipe + "&app_id=$db2068d1&app_key=$127783986707bb581c4c809d8acd189a"
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayFood(data){
    var food = JSON.parse(data);
    if(food.meal === "none") {
        document.getElementById("food").className = "alert alert-warning";
        document.getElementById("food").innerHTML = "No place matches that zip code."
    } else {
        document.getElementById("food").className = "alert alert-success";
        document.getElementById("food").innerHTML = food.foods[0]["food name"] +
        ", " +
        food.foods[0].state +
        ", " +
        food.meal;
    }
}
