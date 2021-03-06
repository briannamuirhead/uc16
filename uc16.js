/**
 * Uses AJAX to query an internet data source for the weather
 * @param {string} cityId The element id that has the name of the city for which we are looking for the weather.
 */
function findWeather(cityId) {
    // First get the city's name code from the HTML textbox
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
                displayWeather('{ "city" : "none" }');
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
    if(weather.city === "none") {
        document.getElementById("weather").className = "alert alert-warning";
        document.getElementById("weather").innerHTML = "There is no city found with that name."
    } else {
        var fahrenheit = weather.main.temp * (9/5) - 459.67;
        var celsius = weather.main.temp - 273.15;
        document.getElementById("weather").className = "alert alert-success";
        document.getElementById("weather").innerHTML = Math.round(fahrenheit) + " °F, " + Math.round(celsius) + " °C, " + weather.main.temp + " Kelvin, " + weather.weather[0].description;
    }
}
