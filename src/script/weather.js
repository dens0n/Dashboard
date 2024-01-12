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
let location = "göteborg";
const apiKey = "10356db26d3e42269ec124314241101";
const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;

async function getWeatherData(url) {
  try {
    const response = await axios.get(url);
    const currentWeatherData = response.data;
    console.log(response.data);
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

function getUserInput() {
  // Hämta värdet från inputfältet
  let userInput = document.getElementById("userInput").value;
  location = userInput.toLowerCase();

  // Gör första bokstaven stor
  // location =
  //   userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

  //töm input efter användaren klickat på knappen
  document.getElementById("userInput").value = "";

  //skicka med den nya länken med valfri location
  getWeatherData(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`
  );
}

function updateWeather(today, tomorrow, dayAfterTomorrow) {
  //Hämta container till vädret
  const weatherCard = document.querySelector(".weather");

  //logga ut vädret till användaren
  weatherCard.innerHTML = `
    <h2 class="weather-font">${today.location.name}s väder</h2>
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
