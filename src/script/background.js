import axios from "axios";

const backgroundBtn = document.getElementById("background-btn");
let userInputTheme = "rain";

// Api link + key
const unsplashApiKey = "2GwNzOMDbOc9794UPXcoNjA2hbnT7NXArsgWZbFOLfg";
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&orientation=landscape&topics=${userInputTheme}`;

/* async function getNewImage(unsplashUrl) {
  try {
    const response = await axios.get(unsplashUrl);
    console.log(response.data);
    const randomImg = response.data.urls;
    const img = new Image();
    img.src = randomImg.full;
    await img.decode();
    document.body.style.backgroundImage = `url(${randomImg.full})`;
    
  } catch (error) {
    console.error(error);
  }
} */
async function getNewImage(unsplashUrl) {
  try {
    const response = await axios.get(unsplashUrl);
    console.log(response.data);
    const randomImg = response.data.urls;

    // laddar liten bild i bakgrunden
    const smallImg = new Image();
    smallImg.src = randomImg.small;

    // när bilden laddats ner visas den som bakgrund
    smallImg.onload = () => {
      document.body.style.backgroundImage = `url(${randomImg.small})`;

      // laddar ner mellan size i bakgrunden
      const regularImg = new Image();
      regularImg.src = randomImg.regular;

      // byter bakgrundsbild till mellansize
      regularImg.onload = () => {
        document.body.style.backgroundImage = `url(${randomImg.regular})`;

        // laddar ner fullsize bild i bakgrunden
        const rawImg = new Image();
        rawImg.src = randomImg.raw;

        // byter till fullsize bakgrund
        rawImg.onload = () => {
          document.body.style.backgroundImage = `url(${randomImg.raw})`;
        };
      };
    };
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
