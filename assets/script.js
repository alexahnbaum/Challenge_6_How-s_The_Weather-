// API key and API URL with city instead of coordinates

var apiKey = "b1d28790f4ccf5e498609e27f6817a7e";
var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";

// Button Element
var buttonEl = $(".button");
// var city = userInputEl.value;

// Take user input from city-search element and store it in a variable to use in the fetch request to the API
buttonEl.on("click", function () {
  var userInput = $("#city-search").val();

  console.log(userInput);

  fetch(apiURL + userInput + "&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#today-city-date").append(data.city.name, data.city.country);
    });
});

// Append data to be displayed on website

// Forecast cards
var forecstCard =
  '<div class="forecast-cards">\
         <h3>(1/24/2024)</h3>\
         <img src="./assets/images/sun.png" alt="sunny icon" class="weather-icon">\
          <p>Temp</p>\
          <p>Wind</p>\
          <p>Humidity</p>\
   </div>';

function createForecastCards() {
  console.log("creating forecast cards");

  for (let i = 0; i < 5; i++) {
    $(".forecast-container").append(forecstCard);
  }
}

createForecastCards();
