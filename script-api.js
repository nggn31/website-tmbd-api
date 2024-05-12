//TMBD
const API_KEY = `api_key=f7b8f382c05b3306adee14b8788fe6d5`;
const BASE_URL = `https://api.themoviedb.org/3`;
const API_URL = BASE_URL + '/discover/movie?sort_by-popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' +API_KEY;

const IMG_URL ='https://image.tmdb.org/t/p/w500';

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
    const moviesContainer = document.querySelector('.movies .movie');

    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('box');

        const boxImg = document.createElement('div');
        boxImg.classList.add('box-img');

        const img = document.createElement('img');
        img.src = `${IMG_URL}${poster_path}`;
        img.alt = title;

        boxImg.appendChild(img);

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;

        const spanEl = document.createElement('span');
        spanEl.textContent = `${vote_average}`;

        movieEl.appendChild(boxImg);
        movieEl.appendChild(titleEl);
        movieEl.appendChild(spanEl);
        
        moviesContainer.appendChild(movieEl);
    });
}

function getColor(vote){
    if(vote>= 8){
        return 'green';
    }else if(vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
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