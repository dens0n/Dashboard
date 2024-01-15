import axios from "axios";

const weekdays = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];

let location = localStorage.getItem("location") || "Stockholm";

const apiKey = import.meta.env.VITE_WEATHER_APIKEY;
const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;

const currentDate = new Date();
const currentDay = weekdays[currentDate.getDay()];
const tomorrowIndex = (currentDate.getDay() + 1) % 7;
const tomorrowsDay = weekdays[tomorrowIndex];
const dayAfterTomorrowIndex = (currentDate.getDay() + 2) % 7;
const dayAfterTomorrowsDay = weekdays[dayAfterTomorrowIndex];

document
  .getElementById("update-location-btn")
  .addEventListener("click", getUserInput);

async function getWeatherData(url) {
  try {
    const response = await axios.get(url);
    const currentWeatherData = response.data;
    const tomorrowsWeatherData = response.data.forecast.forecastday[1].day;
    const dayAfterTomorrowData = response.data.forecast.forecastday[2].day;
    updateWeather(
      currentWeatherData,
      tomorrowsWeatherData,
      dayAfterTomorrowData
    );
  } catch (error) {
    console.error(error);
    alert("Skriv in en giltig stad");
  }
}

getWeatherData(url);

function saveLocationToLocalStorage(newLocation) {
  localStorage.setItem("location", newLocation);
}

function getUserInput() {
  let userInput = document.getElementById("userInput").value;
  location = userInput.toLowerCase();
  document.getElementById("userInput").value = "";

  saveLocationToLocalStorage(location);

  getWeatherData(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`
  );
}

function updateWeather(today, tomorrow, dayAfterTomorrow) {
  const weatherCard = document.querySelector(".weather");

  weatherCard.innerHTML = `
    <h2 class="card-title">${today.location.name}s väder</h2>
    <div class="weather-card">
      <div class="img-container">
        <img src="${today.current.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${currentDay}</h3>
        <p class="c2">${today.current.temp_c}°C</p>
      </div>
      <div class="c1">
        <p>${today.current.condition.text}</p>
      </div>
    </div>

    <div class="weather-card">
      <div class="img-container">
        <img src="${tomorrow.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${tomorrowsDay}</h3>
        <p class="c2">${tomorrow.avgtemp_c}°C</p>
      </div>
      <div class="c1">
        <p>${tomorrow.condition.text}</p>
      </div>
    </div>

    <div class="weather-card">
      <div class="img-container">
        <img src="${dayAfterTomorrow.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${dayAfterTomorrowsDay}</h3>
        <p class="c2">${dayAfterTomorrow.avgtemp_c}°C</p>
      </div>
      <div class="c1">
        <p>${dayAfterTomorrow.condition.text}</p>
      </div>
    </div>
  `;
}
