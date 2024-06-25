const API_KEY = '9975187a3fab275529f9b6654a210084';
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
  fetchTrendingMovies();
});

function fetchTrendingMovies() {
  fetch(TRENDING_URL)
    .then(response => response.json())
    .then(data => {
      const moviesContainer = document.getElementById('moviesContainer');
      data.results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
          <a href="details.html?movieID=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          </a>
          <h3>${movie.title}</h3>
          <p>Rating: ${movie.vote_average}</p>
        `;
        moviesContainer.appendChild(movieElement);
      });
    })
    .catch(error => console.error('Error fetching trending movies:', error));
}
