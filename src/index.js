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
    const data = getCoordinates(searchText.value);
    /** get latitude and longitude of the first result */
    console.log(data);
  });

  searchForm.appendChild(searchText);
  searchForm.appendChild(searchButton);

  main.appendChild(searchForm);

  return main;
}

async function getCoordinates(location) {
  const link =
    "https://geocoding-api.open-meteo.com/v1/search?name=" + location;
  try {
    const response = await fetch(link, { mode: "cors" });
    return response.json();
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
