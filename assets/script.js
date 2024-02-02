// API key
var apiKey = "b1d28790f4ccf5e498609e27f6817a7e";
//API URL for weather
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
// API URL for forecast
var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?";

// Button Element
var buttonEl = $("#button");

// Initial search button click
buttonEl.on("click", function () {
  var userInput = $("#city-search").val();

  // Call function getWeather and pass userInput value into it
  getWeather(userInput);
  console.log(userInput);
  // Append searched city to UL below search bar as a list
  var greyButton = "<button id=grey-button>" + userInput + "</button>";

  $("#city-list").append(greyButton);

  // Listen for clicks on grey buttons - buttons with searched preiously cities
  $("#city-list").on("click", "button", function () {
    var cityClicked = $(this).text();
    console.log(cityClicked);
    // Call function getWeather and pass cityClicked text into it
    getWeather(cityClicked);
  });
});

// Function getWeather to do 2 fetches:
// - 1 fecth to the API to show current weather
// - 1 fecth to the API to show five day forecast
function getWeather(cityName) {
  fetch(weatherApiUrl + cityName + "&appid=" + apiKey + "&units=imperial")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $("#today-city-date").text(
        `${data.name} (${dayjs.unix(data.dt).format("MM DD, YYYY")})`
      );
      var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      $("#icon").attr("src", iconUrl);
      $("#temp").text(`${data.main.temp} F`);
      $("#wind").text(`${data.wind.speed} MPH`);
      $("#humidity").text(`${data.main.humidity} %`);

      // fetch forecast API
      fetch(
        forecastApiUrl +
          "lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=" +
          apiKey +
          "&units=imperial"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          // Forecast cards
          // Create and empty forecast cards
          //Append five forecast cards
          $(".forecast-container").empty();
          for (let i = 3; i < data.list.length; i += 8) {
            var forecastIconUrl = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
            var forecastCard = `<div class="forecast-cards">\
            <h3>${dayjs
              .unix(data.list[i].dt)
              .format("MM DD, YYYY")} <img src= '${forecastIconUrl}'/></h3>\
            <p>Temp ${data.list[i].main.temp} F</p>\
            <p>Wind ${data.list[i].wind.speed} MPH</p>\
            <p>Humidity ${data.list[i].main.humidity} %</p>\
            
          </div>`;
            $(".forecast-container").append(forecastCard);
          }
        });
    });
}
