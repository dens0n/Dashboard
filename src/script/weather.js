import axios from "axios";
//Ta fram vilken dag det är idag + imorgon + i övermorgon
const weekdays = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];
const currentDate = new Date();
const currentDay = weekdays[currentDate.getDay()];
const tomorrowIndex = (currentDate.getDay() + 1) % 7;
const tomorrowsDay = weekdays[tomorrowIndex];
const dayAfterTomorrowIndex = (currentDate.getDay() + 2) % 7;
const dayAfterTomorrowsDay = weekdays[dayAfterTomorrowIndex];

//hämta knapp till sökfunktionen
document
  .getElementById("update-location-btn")
  .addEventListener("click", getUserInput);

//Api länk + nyckel
let location = "stockholm";
const apiKey = "10356db26d3e42269ec124314241101";
const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;

async function getWeatherData(url) {
  try {
    const response = await axios.get(url, location);
    const currentWeatherData = response.data.current;
    console.log(response);
    const tomorrowsWeatherData = response.data.forecast.forecastday[1].day;
    const dayAfterTomorrowData = response.data.forecast.forecastday[2].day;
    console.log(currentWeatherData);
    updateWeather(
      currentWeatherData,
      tomorrowsWeatherData,
      dayAfterTomorrowData,
      location
    );
  } catch (error) {
    console.error(error);
    alert("Skriv in en giltig stad");
  }
}

getWeatherData(url);

function getUserInput() {
  // Hämta värdet från inputfältet
  let userInput = document.getElementById("userInput").value;

  // Gör första bokstaven stor
  location =
    userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

  //töm input efter användaren klickat på knappen
  document.getElementById("userInput").value = "";

  //skicka med den nya länken med valfri location
  getWeatherData(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`,
    location
  );
}

function updateWeather(today, tomorrow, dayAfterTomorrow, location) {
  //Hämta container till vädret
  const weatherCard = document.querySelector(".weather");

  //logga ut vädret till användaren
  weatherCard.innerHTML = `
    <h2 class="weather-font">${location}s väder</h2>
    <div class="weather-card">
      <div class="img-container">
        <img src="${today.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${currentDay}</h3>
        <p class="c2">${today.temp_c}°C</p>
      </div>
      <div class="c1">
        <p>${today.condition.text}</p>
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
