const moviesContainer = document.querySelector('.movies-container');

document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;

    document.querySelector('.prev').addEventListener('click', () => {
        navigate(-1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        navigate(1);
    });

    function navigate(direction) {
        const galleryContainer = document.querySelector('.gallery-container');
        const totalImages = document.querySelectorAll('.gallery-item').length;

        currentIndex = (currentIndex + direction + totalImages) % totalImages;
        const offset = -currentIndex * 100;

        galleryContainer.style.transform = `translateX(${offset}%)`;
    }

    //TMBD
    const API_KEY = `api_key=f7b8f382c05b3306adee14b8788fe6d5`;
    const BASE_URL = `https://api.themoviedb.org/3`;
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
    const searchURL = BASE_URL + '/search/movie?' +API_KEY;

    const IMG_URL ='https://image.tmdb.org/t/p/w500';

    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search');

    

    function showMovies(data){
        main.innerHTML= '';

        data.forEach(movie => {
            const {title, poster_path, vote_average, overview} = movie;

            // Truncate overview to 80 words (adjust as needed)
        const words = overview.split(' ');
        const truncatedOverview = words.slice(0, 80).join(' ') + (words.length > 80 ? '...' : '');


            const movieElement = document.createElement('div');
            movieElement.classList.add('gallery-item');
            movieElement.innerHTML = `
                <div class="content-container">
                    <div class="title-and-paragraph">
                        <h1>${title}</h1>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-half-line"></i>
                        <p>${truncatedOverview}</p>
                    </div>
                    <img src="${IMG_URL + poster_path}" alt="${title}" class="sidebar-image">    
                </div>`;

                main.appendChild(movieElement);
        });

        updateSlider(data.slice(0, 3));
    }

    function updateSlider(movies){
        const galleryContainer = document.querySelector('.gallery-container');
        //clear existing content
        galleryContainer.innerHTML = '';

        movies.forEach(movie =>{
            const figure = document.createElement('figure');
            figure.classList.add('gallery-item');

            figure.innerHTML = `
                <div class= "content-container">
                    <div class="title-and-paragraph">
                        <h1>${movie.title}</h1>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-half-line"></i>
                        <p>${movie.overview}</p>
                    </div>
                    <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" class="sidebar-image">
                </div>`;

            galleryContainer.appendChild(figure);
        });
    }

    // Llama a la función para obtener películas y mostrarlas
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data.results); // Asegúrate de que los datos sean correctos
            showMovies(data.results);
            // showMoviesPoster(data.results, IMG_URL);
            // showFirstMovie(data.results, IMG_URL);
            showImages(data.results, IMG_URL);
        })
        .catch(error => {
            console.error('Error al obtener películas:', error);
        });
});

// function showMoviesPoster(data, IMG_URL) {
//     const categoriesContainer = document.querySelector('.categories-container');

//         data.forEach(movie => {

//             const movieImageUrl = IMG_URL + movie.poster_path;

//             const imageElement = document.createElement('img');
//             imageElement.src = movieImageUrl;
//             imageElement.alt = movie.title;

//             categoriesContainer.appendChild(imageElement);    
//     });
// }

function showImages(data, IMG_URL) {
    const seriesImageContainer = document.querySelector('.series-image-container');
    const moviesImageContainer = document.querySelector('.movies-image-container');

    // Filtrar películas y series
    const series = data.filter(movie => movie.media_type === 'tv');
    const movies = data.filter(movie => movie.media_type === 'movie');

    // Tomar la primera serie y película
    const firstSeries = series[0];
    const firstMovie = movies[0];

    // Mostrar la imagen de la serie
    if (firstSeries) {
        const seriesImageUrl = IMG_URL + firstSeries.poster_path;
        const seriesImage = document.createElement('img');
        seriesImage.src = seriesImageUrl;
        seriesImage.alt = firstSeries.title;
        seriesImageContainer.appendChild(seriesImage);
    }

    // Mostrar la imagen de la película
    if (firstMovie) {
        const movieImageUrl = IMG_URL + firstMovie.poster_path;
        const movieImage = document.createElement('img');
        movieImage.src = movieImageUrl;
        movieImage.alt = firstMovie.title;
        moviesImageContainer.appendChild(movieImage);
    }
}


const preguntas = document.querySelectorAll(".pregunta_encabezado");

preguntas.forEach((pregunta) => {
	pregunta.addEventListener("click", () => {
		removerClaseActivo();
		pregunta.nextElementSibling.classList.add("activo");
	});
});

function removerClaseActivo() {
	preguntas.forEach((pregunta) => {
		pregunta.nextElementSibling.classList.remove("activo");
	});
}