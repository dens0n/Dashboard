// spara länk till local storage
function saveLinksToLocalStorage(links) {
  localStorage.setItem("savedLinks", JSON.stringify(links));
}

// ladda sparade länkar från local storage
function loadAndDisplayLinks() {
  const linkCard = document.getElementById("links-container");
  const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];

  savedLinks.forEach((savedLink) => {
    displayLinkInput(savedLink);
  });
}

// visa länken som skrivs in och spara till local storage
function displayLinkInput(quickLinkUrl) {
  const linkCard = document.getElementById("links-container");
  document.getElementById("linkInput").value = "";
  const favicon = `https://www.google.com/s2/favicons?domain=${quickLinkUrl.hostname}&sz=512`;

  //skapa kortet med innehåll från länken
  const linkContainer = document.createElement("div");
  linkContainer.className = "links-card";

  const linkElement = document.createElement("a");
  linkElement.href = quickLinkUrl.link;

  const faviconElement = document.createElement("img");
  faviconElement.src = quickLinkUrl.favicon;
  faviconElement.alt = "";
  faviconElement.className = "favicon";

  const linkNameElement = document.createElement("p");
  linkNameElement.textContent = quickLinkUrl.name;
  linkNameElement.className = "link-font";

  linkElement.appendChild(faviconElement);
  linkElement.appendChild(linkNameElement);

  // "Ta bort knapp"
  const removeButtonElement = document.createElement("button");
  removeButtonElement.className = "remove-link-btn";
  removeButtonElement.addEventListener("click", function (event) {
    event.stopPropagation();
    linkCard.removeChild(linkContainer);

    // Ta bort vald länk från local storage
    const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
    const updatedLinks = savedLinks.filter(
      (link) => link.link !== quickLinkUrl.link
    );
    saveLinksToLocalStorage(updatedLinks);
  });

  // lägg till kortet med länk och "ta bort knapp"
  linkContainer.appendChild(linkElement);
  linkContainer.appendChild(removeButtonElement);

  // öppna vald länk i ny tab
  linkContainer.addEventListener("click", function (event) {
    event.preventDefault();
    window.open(quickLinkUrl.link, "_blank");
  });

  // lägg till kortet i containern
  linkCard.appendChild(linkContainer);
}

// ladda länkarna när sidan startas
loadAndDisplayLinks();

const addLinkBtn = document.getElementById("add-link-btn");

addLinkBtn.addEventListener("click", () => {
  const linkInput = document.getElementById("linkInput").value.trim();
  const formattedData = formatUrl(linkInput);
  if (formattedData === null) {
    return alert("Adressen är ogiltig. Försök igen med hela länken.");
  } else {
    const savedLinks = JSON.parse(localStorage.getItem("savedLinks")) || [];
    savedLinks.push(formattedData);

    saveLinksToLocalStorage(savedLinks);
    displayLinkInput(formattedData);
  }
});

//  formatering av input länk
function formatUrl(inputUrl) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const fullUrl = inputUrl.startsWith("http")
    ? inputUrl
    : `https://${inputUrl}`;

  if (inputUrl === "" || !urlRegex.test(fullUrl)) {
    return null;
  }

  const urlObject = new URL(fullUrl);
  const siteName = urlObject.hostname
    .replace(/^www\./, "")
    .replace(/\.(com|se|net|org|no|fi)$/, "");

  const favicon = `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=25`;

  return {
    link: fullUrl,
    name: siteName,
    favicon: favicon,
  };
}
