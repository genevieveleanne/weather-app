//Get user temperature, weather description, humidity, & wind speed
//Change user temperature from fahreneheit to celsius
//Get user's current location - Add button for it
//Get user's forecast - Add a div for it

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

//CURRENT WEATHER
function displayCurrentWeather(response) {
  console.log(response);
}

//API CALLED
function getWeather(city) {
  let apiKey = `1bac80fa0c32ft537387a483f19bf3fo`;
  let apiUrlBase = `https://api.shecodes.io/weather/v1/`;

  let currentWeather = `${apiUrlBase}current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(currentWeather).then(displayCurrentWeather);
}

//USER SUBMITS FORM
function handleSubmit(event) {
  event.preventDefault();

  let userCityInput = document.querySelector("#user-city-input");

  getWeather(userCityInput.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
