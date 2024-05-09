
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

// //TMBD
// const API_KEY = api_key=f7b8f382c05b3306adee14b8788fe6d5;
// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + '/discover/movie?sort_by-popularity.desc&' + API_KEY;
// const searchURL = BASE_URL + '/search/movie?' +API_KEY;

// const IMG_URL ='https://image.tmdb.org/t/p/w500';

// const main = document.getElementById('main');
// const form = document.getElementById('form');
// const search = document.getElementById('search');


// getMovies(API_URL);

// function getMovies(url){
//     fetch(url).then(res=>res.json()).then(data =>{
//         console.log(data.results);
//         showMovies(data.results);
//     });
// }

// function showMovies(data){
//     main.innerHTML='';

//     data.forEach(movie => {
//         const {title,poster_path,vote_average,overview} = movie;
//         const movieEl = document.createElement('div');
//         movieEl.classList.add('movie');
//         movieEl.innerHTML = `
//         <div class="box">
//         <a href="#"><img src="${IMG_URL+poster_path}" alt="${title}" /></a>
//         <h3>${title}</h3>
//         <span class="${getColor(vote_average)}">${vote_average}</span>
//         <h3>${overview}</h3>
//         </div>
//         `

//         main.appendChild(movieEl);

//     });
// }

// function getColor(vote){
//     if(vote>= 8){
//         return 'green';
//     }else if(vote>=5){
//         return 'orange';
//     }else{
//         return 'red';
//     }
// }

// form.addEventListener('submit', (e) =>{
//     e.preventDefault();

//     const searchTerm = search.value; 

//     if(searchTerm){
//         getMovies(searchURL + '&query=' + searchTerm);
//     }else{
//         getMovies(API_URL);
//     }
// });