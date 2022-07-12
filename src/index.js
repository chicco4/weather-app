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

  /** SEARCH FORM */
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
    const weat = getWeather(coord);
    console.log(weat);

    updateSearchResult(weat);
  });

  searchForm.appendChild(searchText);
  searchForm.appendChild(searchButton);

  /** SEARCH RESULT */
  const searchResult = document.createElement("div");
  searchResult.setAttribute("id", "searchResult");
  searchResult.classList.add("search-result");

  const cityName = document.createElement("h3");
  cityName.setAttribute("id", "cityName");
  const temperature = document.createElement("p");
  temperature.setAttribute("id", "temperature");
  const apparent = document.createElement("p");
  apparent.setAttribute("id", "apparent");
  const weather = document.createElement("p");
  weather.setAttribute("id", "weather");

  searchResult.appendChild(cityName);
  searchResult.appendChild(temperature);
  searchResult.appendChild(apparent);
  searchResult.appendChild(weather);

  main.appendChild(searchForm);
  main.appendChild(searchResult);

  return main;
}

function updateSearchResult(weat) {
  console.log(weat.temp);
  console.log(weat.t_temp);
  console.log(weat.w_code);
  document.getElementById("cityName").textContent = searchText.value;
  document.getElementById("temperature").textContent = String(weat.temp);
  document.getElementById("apparent").textContent = String(weat.t_temp);
  document.getElementById("weather").textContent = String(weat.w_code);
  /** set active */
  searchResult.classList.add("active");
}

function getWeatherfrom_w_code(code) {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "partly cloudy";
  if (code === 3) return "overcast";
  if (code === 45) return "Fog";
  if (code === 48) return "depositing rime fog";
  if (code === 51) return "Drizzle: Light";
  if (code === 53) return "Drizzle: moderate";
  if (code === 55) return "Drizzle: dense intensity";
  if (code === 56) return "Freezing Drizzle: Light";
  if (code === 57) return "Freezing Drizzle: dense intensity";
  if (code === 61) return "Rain: Slight";
  if (code === 63) return "Rain: moderate";
  if (code === 65) return "Rain: heavy intensity";
  if (code === 66) return "Freezing Rain: Light";
  if (code === 67) return "Freezing Rain: heavy intensity";
  if (code === 71) return "Snow fall: Slight";
  if (code === 73) return "Snow fall: moderate";
  if (code === 75) return "Snow fall: heavy intensity";
  if (code === 77) return "Snow grains";
  if (code === 80) return "Rain showers: Slight";
  if (code === 81) return "Rain showers: moderate";
  if (code === 82) return "Rain showers: violent";
  if (code === 85) return "Snow showers slight";
  if (code === 86) return "Snow showers heavy";
  if (code === 95) return "Thunderstorm: Slight";
  if (code === 96) return "Thunderstorm: moderate";
  if (code === 99) return "Thunderstorm: heavy hail";
  return "NAN";
}

/** try to fetch only first values */
async function getWeather(coord) {
  const api_url =
    "https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&daily=weathercode,temperature_2m_max,apparent_temperature_max&timezone=Europe%2FLondon";
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    let temp = data.daily.temperature_2m_max[0];
    let t_temp = data.daily.apparent_temperature_max[0];
    let code = data.daily.weathercode[0];
    let w_code = getWeatherfrom_w_code(code);
    return { temp, t_temp, w_code };
  } catch (error) {
    console.log(error);
    return null;
  }
}

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
