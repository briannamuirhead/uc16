/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findWeather(cityId) {
    // First get the zip code from the HTML textbox
    var city = document.getElementById(cityId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayWeather(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayWeather(this.responseText);
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=b2d53dfcbf6b2b74b1a81b060d9938ec"
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayWeather(data){
    var weather = JSON.parse(data);
    var fahrenheit = weather.main.temp * (9/5) - 459.67;
    if(weather.message === "city not found") {
        document.getElementById("weather").className = "alert alert-warning";
        document.getElementById("weather").innerHTML = "No place matches that zip code."
    } else {
        document.getElementById("weather").className = "alert alert-success";
        document.getElementById("weather").innerHTML = Math.round(fahrenheit) + " degrees";
    }
}
