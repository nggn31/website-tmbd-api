//TMBD
const API_KEY = `api_key=f7b8f382c05b3306adee14b8788fe6d5`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = BASE_URL + '/discover/movie?sort_by-popularity.desc&' + API_KEY;


const IMG_URL ='https://image.tmdb.org/t/p/w300';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;



const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data =>{
       console.log(data.results);
        showMovies(data.results);
    });
}

function showMovies(data){
    const moviesContainer = document.getElementById('movies'); // Obtener el contenedor de películas

    moviesContainer.innerHTML = ''; // Limpiar el contenedor de películas antes de agregar nuevas películas


    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;

        // Crear un elemento div para la película
        const movieEl = document.createElement('div');
        movieEl.classList.add('box');

        // Crear un elemento imagen para el póster de la película
        const img = document.createElement('img');
        img.classList.add('box-img');
        img.src = `${IMG_URL}${poster_path}`;
        img.alt = title;

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
        const movieContent = document.createElement('div');
        movieContent.classList.add('box-content');

        // Crear un elemento h2 para el título de la película
        const titleEl = document.createElement('h2');
        titleEl.textContent = title;

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
        const truncatedOverview = overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview;
        overviewEl.textContent = truncatedOverview;

        // Agregar todos los elementos creados al elemento de película
        movieContent.appendChild(titleEl);
        movieContent.appendChild(ratingDiv);
        movieContent.appendChild(overviewEl);
        
        movieEl.appendChild(img);
        movieEl.appendChild(favIcon);
        movieEl.appendChild(movieContent);
        
        moviesContainer.appendChild(movieEl); // Agregar el elemento de película al contenedor de películas
    });
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchTerm = search.value; 

    if(searchTerm){
        getMovies(searchURL + '&query=' + searchTerm);
    }else{
        getMovies(API_URL);
    }
});