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

let location = localStorage.getItem("location") || null;
const openCageApiKey = import.meta.env.VITE_OPENCAGE_APIKEY;
const apiKey = import.meta.env.VITE_WEATHER_APIKEY;
let url = "";

const currentDate = new Date();
const currentDay = weekdays[currentDate.getDay()];
const tomorrowIndex = (currentDate.getDay() + 1) % 7;
const tomorrowsDay = weekdays[tomorrowIndex];
const dayAfterTomorrowIndex = (currentDate.getDay() + 2) % 7;
const dayAfterTomorrowsDay = weekdays[dayAfterTomorrowIndex];

document
  .getElementById("update-location-btn")
  .addEventListener("click", getUserInput);

// Funktion för att hämta användarens plats och uppdatera "location"
async function getUserLocation() {
  if (location) {
    // Användaren har en sparad plats i local storage
    url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;
    return;
  }

  if (navigator.geolocation) {
    // Hämta plats genom geolocation om ingen sparad plats finns
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`
      );
      const city = response.data.results[0].components.city;
      location = city.toLowerCase();
      url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;
    } catch (error) {
      console.error(error);
    }
  }
}

// Funktion för att hämta väderdata
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

// Starta funktionen för att hämta användarens plats och sedan fortsätta med väderdata
async function startWeatherApp() {
  await getUserLocation();
  getWeatherData(url);
}

// Klickhanterare för att spara input-värde till local storage
function saveLocationToLocalStorage(newLocation) {
  localStorage.setItem("location", newLocation);
}

// Klickhanterare för att hämta input från användaren och uppdatera väderdata
function getUserInput() {
  let userInput = document.getElementById("userInput").value;
  location = userInput.toLowerCase();
  document.getElementById("userInput").value = "";

  saveLocationToLocalStorage(location);

  // Uppdatera URL:en för att hämta väderdata med den nya platsen
  url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;

  getWeatherData(url);
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

startWeatherApp();
