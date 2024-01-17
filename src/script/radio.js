import axios from "axios";

const url = "https://api.sr.se/api/v2/channels/?format=json";
const limit = 4;
const radioCards = document.getElementById("radio");
let currentPlayingAudio = null;

async function radioData() {
  try {
    const response = await axios.get(url);
    const radioData = response.data.channels.slice(0, limit);
    radiochannels(radioData);
  } catch (error) {
    console.error(error);
    alert("Fel uppstod! Försök igen om ett tag.");
  }
}

function togglePlayPause(event) {
  const card = event.target.closest(".radio-card");
  const audio = card.querySelector("audio");
  const playBtn = card.querySelector(".playBtn");
  const pauseBtn = card.querySelector(".pauseBtn");

  if (audio.paused) {
    if (currentPlayingAudio && currentPlayingAudio !== audio) {
      currentPlayingAudio.pause();
    }
    currentPlayingAudio = audio;

    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");
}

function radiochannels(channels) {
  const html = channels
    .map(
      (channel) => `
      <div class="radio-card" style="background-color: #${channel.color};">
          <img class="radio-img" src="${channel.image}" alt="">
          <div class="play_controls">
              <audio id="audio_${channel.id}">
                   <source src="${channel.liveaudio.url}" type="audio/mpeg" />
              </audio>
              <img class="playBtn" src="src/images/play.png" alt="play button" width="20px">
              <img class="pauseBtn hidden" src="src/images/pause.png" width="20px" alt="pause button">
          </div>
      </div>`
    )
    .join("");

  radioCards.innerHTML = html;

  radioCards.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("playBtn") ||
      event.target.classList.contains("pauseBtn")
    ) {
      togglePlayPause(event);
    }
  });

  const audioElements = document.querySelectorAll("audio");
  audioElements.forEach((audio) => {
    audio.addEventListener("play", function () {
      const card = audio.closest(".radio-card");
      card.querySelector(".playBtn").classList.add("hidden");
      card.querySelector(".pauseBtn").classList.remove("hidden");
    });

    audio.addEventListener("pause", function () {
      const card = audio.closest(".radio-card");
      card.querySelector(".playBtn").classList.remove("hidden");
      card.querySelector(".pauseBtn").classList.add("hidden");
    });
  });
}

radioData();
