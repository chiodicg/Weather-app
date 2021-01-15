//To appear the current date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours(now);
if (hour < 10) {hour = `0${hour}`}
let minutes = now.getMinutes(now);
if (minutes < 10) {minutes = `0${minutes}`}
function formatDate() {
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day} ${hour}:${minutes}`;
}
formatDate();

//Search engine and appear city and temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#temp-day1").innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
        }

function search(city) {
    let apiKey = "7de7d337ce8802b808862965eb088195";
    let units = "metric"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  if (searchInput.length > 0) {
  search(searchInput);
  } else {
    alert("Please, type a city.")
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
search("Edinburgh")



//Celsius to Fahrenheit
function changeToFahrentheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-day1");
//  let temperatureElement = document.querySelectorAll(".temp");
//  let temperatures = Number(temperatureElement.innerHTML);
//  console.log(temperatureElement.innerHTML);
//  [].forEach(el => {
//    console.log(el)
//    el.innerHTML = Math.round((el * 9)/5 + 32);
//  })
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9)/5 + 32);

  let temperatureUnit = document.querySelectorAll(".unit"); 
  [].forEach.call(temperatureUnit, function(unit) {
    unit.innerHTML = `ºF`;
  }); 
  degreesButton.removeEventListener("click", changeToFahrentheit);
  degreesButton.addEventListener("click", changeToCelsius);
}

function changeToCelsius (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-day1");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 5/9);

  let temperatureUnit = document.querySelectorAll(".unit"); 
  [].forEach.call(temperatureUnit, function(unit) {
    unit.innerHTML = `ºC`;
  }); 
  degreesButton.removeEventListener("click", changeToCelsius);
  degreesButton.addEventListener("click", changeToFahrentheit);
}

let degreesButton = document.querySelector("#degrees-link");
degreesButton.addEventListener("click", changeToFahrentheit);

//Current location button
function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "7de7d337ce8802b808862965eb088195";
    let units = "metric"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(getPosition)};

let locationButton = document.querySelector(".geolocation");
locationButton.addEventListener("click", currentLocation);