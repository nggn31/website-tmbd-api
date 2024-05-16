
    // Selecciona el checkbox
    var checkbox = document.getElementById('check');
    // Selecciona el menú
    var menu = document.querySelector('.menu');

    // Agrega un event listener al menú
    menu.addEventListener('click', function() {
        // Desmarca el checkbox cuando se hace clic en el menú
        checkbox.checked = false;
    });

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

    

    // function showMovies(data) {
    //     main.innerHTML = '';
    
    //     data.forEach(movie => {
    //         const { title, poster_path, vote_average, overview } = movie;

            
    //         const maxLength = 50;
    //         let truncatedOverview = overview;
    
    //         if (overview.length > maxLength) {
    //             const words = overview.split(' ');
    //             const truncatedWords = words.slice(0, maxLength);
    //             truncatedOverview = truncatedWords.join(' ') + '...';
    //         }
    
    //         const movieElement = document.createElement('div');
    //         movieElement.classList.add('gallery-item');
    //         movieElement.innerHTML = `
    //             <div class="content-container">
    //                 <div class="title-and-paragraph">
    //                     <h1>${title}</h1>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-fill"></i>
    //                     <i class="ri-star-half-line"></i>
    //                     <p>${truncatedOverview}</p>
    //                 </div>
    //                 <img src="${IMG_URL + poster_path}" alt="${title}" class="sidebar-image">    
    //             </div>`;
    
    //         main.appendChild(movieElement);
    //     });
    
    //     updateSlider(data.slice(0, 3));
    // }

        
// Función para obtener el número de estrellas según el voto promedio
function getStarRating(voteAverage) {
    const roundedRating = Math.round(voteAverage) / 2; // Redondear el voto promedio y dividir por 2 para obtener un máximo de 5 estrellas
    const starCount = Math.floor(roundedRating); // Obtener el número entero de estrellas
    const halfStar = roundedRating % 1 !== 0; // Verificar si hay media estrella

    let starsHTML = '';
    for (let i = 0; i < starCount; i++) {
        starsHTML += '<i class="ri-star-fill"></i>'; // Estrellas completas
    }
    if (halfStar) {
        starsHTML += '<i class="ri-star-half-line"></i>'; // Media estrella si corresponde
    }
    return starsHTML;
}

    function showMovies(data) {
        main.innerHTML = '';
    
        // Barajar el array de películas
        const shuffledData = shuffle(data);
    
        // Tomar las primeras tres películas
        const randomMovies = shuffledData.slice(0, 3);
    
        randomMovies.forEach(movie => {
            const { title, poster_path, vote_average, overview } = movie;
            
            console.log('Voto promedio:', vote_average); // Verificar el voto promedio

            const overviewEl = document.createElement('p');
            const words = overview.split(/\s+/); // Expresión regular para dividir por espacios en blanco
            const truncatedOverview = words.slice(0, 55).join(' '); // Tomar solo las primeras 10 palabras
            overviewEl.textContent = truncatedOverview;

            const movieElement = document.createElement('div');
            movieElement.classList.add('gallery-item');
            const stars = getStarRating(vote_average); // Obtener el número de estrellas según el voto promedio
            movieElement.innerHTML = `
                <div class="content-container">
                    <div class="title-and-paragraph">
                        <h1>${title}</h1>
                        ${stars}
                        <p>${truncatedOverview}</p>
                    </div>
                    <img src="${IMG_URL + poster_path}" alt="${title}" class="sidebar-image">    
                </div>`;
    
            main.appendChild(movieElement);
        });
    
        updateSlider(randomMovies);
    }
    
    // Función para barajar un array
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        // Mientras queden elementos a barajar
        while (0 !== currentIndex) {
    
            // Seleccionar un elemento sin barajar
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // Intercambiarlo con el elemento actual
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    function updateSlider(movies) {
        const galleryContainer = document.querySelector('.gallery-container');
        // Limpiar contenido existente
        galleryContainer.innerHTML = '';
    
        movies.forEach(movie => {
            const { title, overview, poster_path } = movie;
            const truncatedOverview = truncateText(overview, 50); // Truncar la descripción a 50 palabras
    
            const figure = document.createElement('figure');
            figure.classList.add('gallery-item');
    
            figure.innerHTML = `
                <div class="content-container">
                    <div class="title-and-paragraph">
                        <h1>${title}</h1>
                        ${getStarRating(movie.vote_average)} <!-- Agrega la calificación de estrellas -->
                        <p>${truncatedOverview}</p>
                    </div>
                    <img src="${IMG_URL}${poster_path}" alt="${title}" class="sidebar-image">
                </div>`;
    
            galleryContainer.appendChild(figure);
        });
    }
    
    // Función para truncar el texto a un número específico de palabras
    function truncateText(text, limit) {
        const words = text.split(' '); // Divide el texto en palabras
        const truncatedWords = words.slice(0, limit); // Toma solo las primeras 'limit' palabras
        const truncatedText = truncatedWords.join(' '); // Une las palabras nuevamente en un texto truncado
        return truncatedText;
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