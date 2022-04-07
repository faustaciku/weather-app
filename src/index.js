function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hour}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formatDate(now);
function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "ecf5d00ea4ad4d6bd65492b2ab3bc3da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "ecf5d00ea4ad4d6bd65492b2ab3bc3da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

function celsiusChange(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = 4;
}

function farenheitChange(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = 39;
}
let currentLocationButton = document.querySelector("#locationInput");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");
