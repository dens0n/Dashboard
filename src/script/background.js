import axios from "axios";

const backgroundBtn = document.getElementById("background-btn");

// Api link + key
const unsplashUserInput = "";
const unsplashApiKey = "2GwNzOMDbOc9794UPXcoNjA2hbnT7NXArsgWZbFOLfg";
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&orientation=landscape&query=${unsplashUserInput}`;

// Uppdatera bakgrundsbild + spara till localstorage
async function getNewImage(unsplashUrl) {
  try {
    const response = await axios.get(unsplashUrl);
    console.log(response.data);
    const randomImg = response.data.urls;

    // 1. Ladda normalstor bild i bakgrunden
    const regularImg = new Image();
    regularImg.src = randomImg.regular;

    // 2. när bilden laddats ner sätts den som bakgrundsbild
    regularImg.onload = () => {
      document.body.style.backgroundImage = `url(${randomImg.regular})`;

      // 3. ladda full storlek på bilden i bakgrunden
      const fullImg = new Image();
      fullImg.src = randomImg.full;

      // 4. När fullsize bild är nerladdad så sätts den som bakgrund och sparas ner i localstorage
      fullImg.onload = () => {
        document.body.style.backgroundImage = `url(${randomImg.full})`;
        localStorage.setItem("backgroundImage", randomImg.full);
      };
    };
  } catch (error) {
    console.error(error);
    alert("Fel uppstod! Försök igen om ett tag.");
  }
}

// ta bort den sparade bilden från localstorage
function clearLocalStorage() {
  localStorage.removeItem("backgroundImage");
}

// När sidan laddas så kollas det ifall bilden finns sparad i local storage, om inte så hämtas en ny rendom bild
window.onload = function () {
  const savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = `url(${savedBackgroundImage})`;
  } else {
    getNewImage(unsplashUrl);
  }
};

backgroundBtn.addEventListener("click", () => {
  backgroundBtn.classList.add("active");
  setTimeout(() => {
    backgroundBtn.classList.remove("active");
  }, 2000);
  clearLocalStorage();
  getNewImage(unsplashUrl);
});
