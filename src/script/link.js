function addLink() {
    // Hämta användarens input
    var linkInput = document.getElementById("linkInput");
    var linkTitleInput = document.getElementById("linkTitleInput");
    var link = linkInput.value.trim();
    var title = linkTitleInput.value.trim();
  
    if (link === "" || title === "") {
      alert("Both link and title are required.");
      return;
    }
  
    // Skapa en länkbehållare
    var savedLinksContainer = document.getElementById("savedLinks");
    var savedLinkContainer = document.createElement("div");
    savedLinkContainer.classList.add("saved-link");
  
    // Skapa en ikon för länken
    var linkIcon = document.createElement("img");
    linkIcon.classList.add("link-icon");
  
    // Hämta favicon med Axios
    axios.get(`https://www.google.com/s2/favicons?domain=${link}`)
      .then(response => {
        linkIcon.src = response.config.url;
      })
      .catch(error => {
        console.error("Error fetching favicon:", error);
      });
  
    // Skapa en textnod för länken
    var linkText = document.createElement("p");
    linkText.textContent = title;
  
    // Lägg till ikon och text i länkbehållaren
    savedLinkContainer.appendChild(linkIcon);
    savedLinkContainer.appendChild(linkText);
  
    // Lägg till länkbehållaren i den övergripande behållaren
    savedLinksContainer.appendChild(savedLinkContainer);
  
    // Rensa inputfälten
    linkInput.value = "";
    linkTitleInput.value = "";
  
    // Spara länken i LocalStorage
    var savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
    savedLinks.push({ title: title, link: link });
    localStorage.setItem("savedLinks", JSON.stringify(savedLinks));
  }
  