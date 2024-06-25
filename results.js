const apiKey = '9975187a3fab275529f9b6654a210084';
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      const movieList = document.getElementById('movieList');
      movieList.innerHTML = '';
      data.results.forEach(movie => {
        const posterPath = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : 'placeholder_image_url'; // Replace 'placeholder_image_url' with a URL to a placeholder image
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
          <img src="${posterPath}" alt="${movie.title} poster">
          <h2>${movie.title}</h2>
          <p>Release Date: ${movie.release_date}</p>
          <button onclick="showDetails(${movie.id})">Details</button>
        `;
        movieList.appendChild(movieItem);
      });
    });
});

function showDetails(movieID) {
  window.location.href = `details.html?movieID=${movieID}`;
}
