// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'новая задача',
//         completed: false
//     }),
//     headers:{
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json))

// const params = new URLSearchParams(location.search);

// const id = params.get('id');

// console.log(id);

// fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//     .then(response => response.json())
//     .then(json => console.log(json))


const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');
let movieDetails = document.getElementById('movie-details');

// Обработчик события для кнопки поиска
searchButton.addEventListener('click', function() {
    let query = searchInput.value;
    fetchMovies(query);
});

// Функция для поиска фильмов по названию
function fetchMovies(query) {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=e2372dbd`)
        .then(response => response.json())
        .then(data => displayMovies(data.Search))
}

// Функция для отображения списка фильмов
function displayMovies(movies) {
    movieContainer.innerHTML = ''; // очистка контейнера перед добавлением новых фильмов

    // Ограничиваем количество отображаемых фильмов до 3
    const limitedMovies = movies.slice(0, 3);

    limitedMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.setAttribute('data-id', movie.imdbID);

        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;

        movieElement.addEventListener('click', function() {
            fetchMovieDetails(movie.imdbID);
        });

        movieContainer.appendChild(movieElement);
        movieElement.style.display = 'block'; // показываем элемент
    });
}

// Функция для получения подробной информации о фильме
function fetchMovieDetails(movieId) {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e2372dbd`)
        .then(response => response.json())
        .then(data => displayMovieDetails(data))
}

// Функция для отображения подробной информации о фильме
function displayMovieDetails(movie) {
    if (!movieDetails) {
        movieDetails = document.createElement('div');
        movieDetails.id = 'movie-details';
        document.body.appendChild(movieDetails);
    }

    movieDetails.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div>
            <h2>${movie.Title}</h2>
            <p><strong>Released:</strong> ${movie.Released}</p>
            <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Language:</strong> ${movie.Language}</p>
            <p><strong>Country:</strong> ${movie.Country}</p>
        </div>
        <button id="close-button">Закрыть</button>
    `;

    movieDetails.style.display = 'block';

    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', function() {
        movieDetails.style.display = 'none';
    });
}