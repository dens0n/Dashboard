import axios from "axios";

const backgroundBtn = document.getElementById("background-btn");
let userInputTheme = "rain";

// Api link + key
const unsplashApiKey = "2GwNzOMDbOc9794UPXcoNjA2hbnT7NXArsgWZbFOLfg";
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&orientation=landscape&topics=${userInputTheme}`;

async function getNewImage(unsplashUrl) {
  try {
    const response = await axios.get(unsplashUrl);
    console.log(response.data);
    const randomImg = response.data.urls.regular;
    document.body.style.backgroundImage = `url(${randomImg})`;
  } catch (error) {
    console.error(error);
  }
}

backgroundBtn.addEventListener("click", () => {
  backgroundBtn.classList.add("active");
  setTimeout(() => {
    backgroundBtn.classList.remove("active");
  }, 2000);

  getNewImage(unsplashUrl);
});
