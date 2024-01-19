# Dashboard

En enkel dashboard där användaren kan spara ner länkar, se vädret från valfri plats, spela upp radio och skriva anteckningar.

## Installation

För att installera och köra projektet, följ dessa steg:

1. Installera med npm:

   ```bash
   npm install
   ```

2. Skapa en `.env`-fil i roten och lägg till API-nycklar:

   ```env
   VITE_WEATHER_APIKEY = "lägg in din api nyckel för UnsplashAPI"
   VITE_BACKGROUND_APIKEY = "lägg in din api nyckel för WeatherAPI"
   VITE_OPENCAGE_APIKEY =  "lägg in din api nyckel för OpenCageAPI"
   ```

   API-nycklarna kan hämtas genom att registrera dig på följande länkar:

   - [Unsplash API](https://unsplash.com/developers)
   - [WeatherAPI](https://www.weatherapi.com/)
   - [OpenCageAPI](https://opencagedata.com/)
