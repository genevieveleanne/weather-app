//GET DATE
function getDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[date.getMonth()];

  let currentDate = date.getDate();

  return `${day}, ${month} ${currentDate}`;
}

let currentDate = document.querySelector("#date");
let now = new Date();

currentDate.innerHTML = getDate(now);

//FAHRENHEIT & CELSIUS LINK
function displayUnits(fahrenheit, event) {
  event.preventDefault();

  let celsiusTemperature = Math.round(((fahrenheit - 32) * 5) / 9);

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${celsiusTemperature}°`;

  let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
  fahrenheitTemperature.addEventListener("click", () => {
    let fahrenheitConvert = document.querySelector("#current-temperature");
    fahrenheitConvert.innerHTML = `${fahrenheit}°`;
  });
}

//USER CURRENT WEATHER
function displayCurrentWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;

  let currentTemperature = document.querySelector("#current-temperature");
  let roundedTemperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${roundedTemperature}°`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let weatherImage = document.querySelector("#weather-image");
  weatherImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", (event) => {
    displayUnits(roundedTemperature, event);
  });
}

//API KEY & BASEPOINT
let apiKey = `1bac80fa0c32ft537387a483f19bf3fo`;
let apiUrlBase = `https://api.shecodes.io/weather/v1/`;

//API CALLED
function getWeather(city) {
  let currentWeather = `${apiUrlBase}current?query=${city}&key=${apiKey}&units=imperial`;
  let forecast = `${apiUrlBase}forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(currentWeather).then(displayCurrentWeather);
  axios.get(forecast).then(displayForecast);
}

//GET USER'S CURRENT LOCATION
function displayUserLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let userLocation = `${apiUrlBase}current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
    axios.get(userLocation).then((response) => {
      displayCurrentWeather(response);
    });
  });
}

let locationButton = document.querySelector("#my-location");
locationButton.addEventListener("click", displayUserLocation);

//GET USER FORECAST
function displayForecast(response) {
  console.log(response.data.daily);
}

//USER SUBMITS FORM
function handleSubmit(event) {
  event.preventDefault();

  let userCityInput = document.querySelector("#user-city-input");
  let userCity = userCityInput.value;
  userCity = userCity.toLowerCase().trim();

  getWeather(userCity);
}

getWeather("Atlanta");

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
