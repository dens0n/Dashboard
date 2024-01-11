import './style.css'
import axios from "axios";
const location = "stockholm" 
const days = 3;
const apiKey = "10356db26d3e42269ec124314241101";


const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

async function getUser() {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Call the function with the provided URL
getUser()