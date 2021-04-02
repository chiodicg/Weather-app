//Show current date and forcast date
function formatDate(timestamp) {
  let date = new Date(timestamp)
  let hour = date.getHours()
  if (hour < 10) { hour = `0${hour}` }
  let minutes = date.getMinutes()
  if (minutes < 10) { minutes = `0${minutes}` }
  return `${forecastDate(timestamp)}, ${hour}:${minutes}`
}
formatDate()

function forecastDate(timestamp) {
  let date = new Date(timestamp)
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
  let day = days[date.getDay()]
  return `${day}`
}

//Show 6-day forecast
function showForecast(response) {
  const forecastElement = document.querySelector('#forecast')
  forecastElement.innerHTML = null
  let forecast = null
  let forecast2 = null
  for (let index = 1; index < 7; index += 2) {
    forecast = response.data.daily[index]
    forecast2 = response.data.daily[index+1]
    console.log(forecast)
    forecastElement.innerHTML += `<div class="row align-items-center forecast">
    <div class="col-md">
    ${forecastDate(forecast.dt * 1000)}
    <br />
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}" class="forecast-icon"> ${Math.round(forecast.temp.day)}ºC <div class="temp" id="max-min"> Max: ${Math.round(forecast.temp.max)}ºC, Min: ${Math.round(forecast.temp.min)}ºC</div>
    </div>
    <div class="col-md">
    ${forecastDate(forecast2.dt * 1000)}
    <br />
    <img src="http://openweathermap.org/img/wn/${forecast2.weather[0].icon}@2x.png" alt="${forecast2.weather[0].description}" class="forecast-icon"> ${Math.round(forecast2.temp.day)}ºC <div class="temp" id="max-min"> Max: ${Math.round(forecast2.temp.max)}ºC, Min: ${Math.round(forecast2.temp.min)}ºC</div>
    </div>
    </div>
    <br />`
  }
}
const apiKey = process.env.API_KEY
const units = 'metric'

//Show current weather
function showTemperature(response) {
  changeToCelsius();
  celsiusTemperature = Math.round(response.data.main.temp)
  celsiusMax = Math.round(response.data.main.temp_max)
  celsiusMin = Math.round(response.data.main.temp_min)
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description
  document.querySelector("#temp-day1").innerHTML = celsiusTemperature
  document.querySelector("#humidity-day1").innerHTML = Math.round(response.data.main.humidity)
  document.querySelector("#wind-day1").innerHTML = Math.round(response.data.wind.speed)
  document.querySelector("#max-day1").innerHTML = `Max: ${celsiusMax}`
  document.querySelector("#min-day1").innerHTML = `Min: ${celsiusMin}`
  let dateTime = document.querySelector("#date-time")
  dateTime.innerHTML = formatDate(response.data.dt * 1000)
  document.querySelector("#icon-day1").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector("#icon-day1").setAttribute("alt", response.data.weather[0].description);
  let lat = response.data.coord.lat
  let lon = response.data.coord.lon
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${units}`
  axios.get(apiForecastUrl).then(showForecast)
        }
//Search for city
function search(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(showTemperature)
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input').value
  if (searchInput.length > 0) {
    search(searchInput)
  } else {
    alert('Please, type a city.')
  }
}

const searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', handleSearch)
search('Edinburgh')

// Celsius-Fahrenheit conversion
function changeToFahrentheit(event) {
  event.preventDefault()
  const temperatureElement = document.querySelector("#temp-day1")
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9)/5 + 32)
  document.querySelector("#max-day1").innerHTML = `Max: ${Math.round((celsiusMax * 9)/5 + 32)}`
  document.querySelector("#min-day1").innerHTML = `Min: ${Math.round((celsiusMin * 9)/5 + 32)}`
  const temperatureUnit = document.querySelectorAll('.unit')
  [].forEach.call(temperatureUnit, function(unit) {
    unit.innerHTML = `ºF`
  })
  degreesButton.removeEventListener("click", changeToFahrentheit)
  degreesButton.addEventListener("click", changeToCelsius)
}

function changeToCelsius(event) {
  const temperatureElement = document.querySelector("#temp-day1")
  temperatureElement.innerHTML = celsiusTemperature;
  document.querySelector("#max-day1").innerHTML = `Max: ${celsiusMax}`
  document.querySelector("#min-day1").innerHTML = `Min: ${celsiusMin}`

  const temperatureUnit = document.querySelectorAll(".unit")
  [].forEach.call(temperatureUnit, function(unit) {
    unit.innerHTML = `ºC`
  });
  degreesButton.removeEventListener("click", changeToCelsius)
  degreesButton.addEventListener("click", changeToFahrentheit)
}

let celsiusTemperature = null
let celsiusMin = null
let celsiusMax = null

const degreesButton = document.querySelector("#degrees-link")
degreesButton.addEventListener("click", changeToFahrentheit)

//Current location button
function getPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(getPosition)}

let locationButton = document.querySelector(".geolocation")
locationButton.addEventListener("click", currentLocation)
