import axios from "axios";
//Ta fram vilken dag det är + imorgon + i övermorgon
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

//Hämta container till vädret
const weatherCard = document.querySelector(".weather");

//Api länk + nyckel
let location = "stockholm";
const apiKey = "10356db26d3e42269ec124314241101";
const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no&lang=sv`;

async function getWeatherData() {
  try {
    const response = await axios.get(url);
    const currentWeatherData = response.data.current;
    const tomorrowsWeatherData = response.data.forecast.forecastday[1].day;
    const dayAfterTomorrowData = response.data.forecast.forecastday[2].day;
    console.log(currentWeatherData);
    updateWeather(
      currentWeatherData,
      tomorrowsWeatherData,
      dayAfterTomorrowData
    );
  } catch (error) {
    console.error(error);
  }
}

getWeatherData();

function updateWeather(today, tomorrow, dayAfterTomorrow) {
  weatherCard.innerHTML = `
    <h2 class="weather-font">${location}s väder</h2>
    <div class="weather-card">
      <div class="img-container">
        <img src="${today.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${currentDay}</h3>
        <p>${today.temp_c}°C</p>
      </div>
      <div class="horizontal-text">
        <p>${today.condition.text}</p>
      </div>
    </div>
 
    <div class="weather-card">
      <div class="img-container">
        <img src="${tomorrow.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${tomorrowsDay}</h3>
        <p>${tomorrow.avgtemp_c}°C</p>
      </div>
      <div class="horizontal-text">
        <p>${tomorrow.condition.text}</p>
      </div>
    </div>
 
    <div class="weather-card">
      <div class="img-container">
        <img src="${dayAfterTomorrow.condition.icon}" alt="" class="weather-img" />
      </div>
      <div class="weather-text">
        <h3>${dayAfterTomorrowsDay}</h3>
        <p>${dayAfterTomorrow.avgtemp_c}°C</p>
      </div>
      <div class="horizontal-text">
        <p>${dayAfterTomorrow.condition.text}</p>
      </div>
    </div>
 
    `;
}
