//TMBD
const API_KEY = `api_key=f7b8f382c05b3306adee14b8788fe6d5`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = BASE_URL + "/discover/tv?sort_by-popularity.desc&" + API_KEY;
const searchURL = BASE_URL + "/search/serie?" + API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getTVShows(API_URL);

function getTVShows(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showTVShows(data.results);
    });
}

function showTVShows(data) {
  const showsContainer = document.querySelector(".shows .show");

  data.forEach((show) => {
    const { name, poster_path, vote_average, overview } = show;
    const showEl = document.createElement("div");
    showEl.classList.add("box");

    const boxImg = document.createElement("div");
    boxImg.classList.add("box-img");

    const img = document.createElement("img");
    img.src = `${IMG_URL}${poster_path}`;
    img.alt = name;

    boxImg.appendChild(img);

    const titleEl = document.createElement("h3");
    titleEl.textContent = name;

    const spanEl = document.createElement("span");
    spanEl.textContent = `${vote_average}`;

    showEl.appendChild(boxImg);
    showEl.appendChild(titleEl);
    showEl.appendChild(spanEl);

    showsContainer.appendChild(showEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getTVShows(searchURL + "&query=" + searchTerm);
  } else {
    getTVShows(API_URL);
  }
});
