//Get user temperature, weather description, humidity, & wind speed
//Change user temperature from fahreneheit to celsius
//Get user's current location - Add button for it
//Get user's forecast - Add a div for it

//DATE
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
