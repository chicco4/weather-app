import "./styles/global.css";

console.log("test");

/* HEADER */

function createHeader() {
  const header = document.createElement("header");

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "Weather-app";

  header.appendChild(pageTitle);

  return header;
}

/* MAIN */

function createMain() {
  const main = document.createElement("main");
  main.textContent = "main";
  return main;
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
