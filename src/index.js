import "./styles/global.css";

console.log("test");

/* HEADER */

function createHeader() {
  const header = document.createElement("header");

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "Weather app";

  header.appendChild(pageTitle);

  return header;
}

/* MAIN */

function createMain() {
  const main = document.createElement("main");

  const searchForm = document.createElement("form");
  searchForm.setAttribute("id", "searchForm");

  const searchText = document.createElement("input");
  searchText.setAttribute("id", "searchText");
  searchText.type = "text";
  searchText.placeholder = "Enter city name";

  const searchButton = document.createElement("input");
  searchButton.setAttribute("id", "searchButton");
  searchButton.type = "button";
  searchButton.value = "Search";

  searchButton.addEventListener("click", (e) => {
    console.log("button clicked");
    const coord = getCoord(searchText.value);
    console.log(coord);
    const weather = getWeather(coord);
    console.log(weather);
  });

  searchForm.appendChild(searchText);
  searchForm.appendChild(searchButton);

  main.appendChild(searchForm);

  return main;
}

/** ritorna le coordinate del primo elemento */
async function getCoord(location) {
  const api_url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" + location;
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    let lat = data.results[0].latitude;
    let lon = data.results[0].longitude;
    let time = data.results[0].timezone;
    return { lat, lon, time };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getWeather(coord) {
  const api_url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    parseFloat(coord.lat) +
    "&longitude=" +
    parseFloat(coord.lon) +
    "&hourly=weathercode&timezone=" +
    "Europe%2FLondon";
  //const api_url = "https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=weathercode&timezone=Europe%2FLondon";
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* FOOTER */

function createFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const copyright = document.createElement("p");
  copyright.textContent = `Copyright © ${new Date().getFullYear()}`;

  const githubLink = document.createElement("a");
  githubLink.href = "https://github.com/chicco4";
  githubLink.textContent = "chicco4";

  footer.appendChild(copyright);
  footer.appendChild(githubLink);

  return footer;
}

/* START */

function initializeContent() {
  document.body.appendChild(createHeader());
  document.body.appendChild(createMain());
  document.body.appendChild(createFooter());
}

initializeContent();
