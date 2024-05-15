//TMBD
const API_KEY = `api_key=f7b8f382c05b3306adee14b8788fe6d5`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = BASE_URL + '/discover/tv?sort_by-popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/tv?' + API_KEY;


const IMG_URL = 'https://image.tmdb.org/t/p/w300';

const form = document.getElementById('form');
const search = document.getElementById('search');

getTVShows(API_URL);

function getTVShows(url){
  fetch(url).then(res=>res.json()).then(data =>{
     console.log(data.results);
      showTVShows(data.results);
  });
}

function showTVShows(data) {
  const showsContainer = document.getElementById('shows'); // Obtener el contenedor de películas

  showsContainer.innerHTML = ''; // Limpiar el contenedor de películas antes de agregar nuevas películas


  showsContainer.innerHTML = ''; // Limpiar el contenedor de series antes de agregar nuevas series

  data.forEach((show) => {
    const {name, poster_path, vote_average, overview} = show;

    // Crear un elemento div para la película
    const showEl = document.createElement('div');
    showEl.classList.add('box');

    // Crear un elemento imagen para el póster de la película
    const img = document.createElement('img');
    img.classList.add('box-img');
    img.src = `${IMG_URL}${poster_path}`;
    img.alt = name;

    // Crear un elemento icono para el favorito
    const favIcon = document.createElement('ion-icon');
    favIcon.classList.add('box-fav');
    favIcon.setAttribute('name', 'heart-outline');

    // Agregar un evento de clic para activar la animación al hacer clic en el icono de favoritos
    favIcon.addEventListener('click', () => {
      favIcon.classList.toggle('active');
      icon.classList.toggle('active');
    });

    // Crear un elemento div para el contenido de la película
    const showContent = document.createElement('div');
    showContent.classList.add('box-content');

    // Crear un elemento h2 para el título de la película
    const titleEl = document.createElement('h2');
    titleEl.textContent = name;

    // Crear un elemento div para el rating de la película
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('box-content-rating');

    // Crear y agregar iconos de estrella al rating
    for (let i = 0; i < Math.floor(vote_average / 2); i++) {
      const starIcon = document.createElement('ion-icon');
      starIcon.setAttribute('name', 'star');
      ratingDiv.appendChild(starIcon);
    }

    // Crear un elemento p para la descripción de la película
    const overviewEl = document.createElement('p');
    overviewEl.textContent = overview;

    // Truncar el texto del resumen para mostrar solo una parte de él
    const maxLength = 90; // Define la longitud máxima del texto del resumen
    const truncatedOverview =
      overview.length > maxLength
        ? overview.substring(0, maxLength) + '...'
        : overview;
    overviewEl.textContent = truncatedOverview;

    // Agregar todos los elementos creados al elemento de película
    showContent.appendChild(titleEl);
    showContent.appendChild(ratingDiv);
    showContent.appendChild(overviewEl);

    showEl.appendChild(img);
    showEl.appendChild(favIcon);
    showEl.appendChild(showContent);

    showsContainer.appendChild(showEl); // Agregar el elemento de película al contenedor de películas
  });
}

form.addEventListener('submit', (e) =>{
  e.preventDefault();

  const searchTerm = search.value; 

  if(searchTerm){
    getTVShows(searchURL + '&query=' + searchTerm);
  }else{
    getTVShows(API_URL);
  }
});