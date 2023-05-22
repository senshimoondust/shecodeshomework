// Get the day

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let daysIndex = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[daysIndex];

  return `${day}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// get weather

function showWeather(response) {
  document.querySelector("li#current-location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// get location/city

function findLocation(position) {
  let apiKey = "325d1deaa9333c57b37b9e2370aaf23f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  findCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function findCity(city) {
  let apiKey = "325d1deaa9333c57b37b9e2370aaf23f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search");
let submitButton = document.querySelector("#search");
submitButton.addEventListener("click", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

findCity("New York");
