var apiKey = "b1d28790f4ccf5e498609e27f6817a7e";
var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=london";

// forecast cards
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
