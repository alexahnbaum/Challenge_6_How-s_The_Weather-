// API key
var apiKey = "b1d28790f4ccf5e498609e27f6817a7e";
//API URL for weather
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
// API URL for forecast
var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?";

// Button Element
var buttonEl = $("#button");

// Take user input from city-search element and store it in a variable to use in the fetch request to the API

// 2 functions:
// - 1 function for button click: show current weather
// - 1 function for button click: show 5-day forecast

buttonEl.on("click", function (firstClick) {
  var weatherAndForecast = firstClick;

  var userInput = $("#city-search").val();

  console.log(userInput);

  fetch(weatherApiUrl + userInput + "&appid=" + apiKey + "&units=imperial")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $("#today-city-date").text(
        `${data.name} ${dayjs.unix(data.dt).format("DD MM, YYYY")}`
      );
      $("#temp").text(`${data.main.temp} F`);
      $("#wind").text(`${data.wind.speed} MPH`);
      $("#humidity").text(`${data.main.humidity} %`);
      var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      $("#icon").attr("src", iconUrl);

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
            <h3>${dayjs.unix(data.list[i].dt).format("DD MM, YYYY")}</h3>\
            <p>Temp ${data.list[i].main.temp} F</p>\
            <p>Wind ${data.list[i].wind.speed} MPH</p>\
            <p>Humidity ${data.list[i].main.humidity} %</p>\
            <img src= '${forecastIconUrl}'/>
          </div>`;
            $(".forecast-container").append(forecastCard);
          }
        });
    });

  // Append searched city to UL below search bar as a list
  var greyButton = "<button id=grey-button>" + userInput + "</button>";

  $("#city-list").append(greyButton);

  console.log(weatherAndForecast);

  // Listen for clicks on grey buttons - buttons with searched preiously cities
  // greyButton.on("click", function () {
  //   weatherAndForecast;
  // });
  // console.log(weatherAndForecast);
});
