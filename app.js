const apiKey = 'b79cb37f77c6e343240f601bb35d938e';

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      const movieList = document.getElementById('movieList');
      movieList.innerHTML = '';
      data.results.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `
          <h2>${movie.title}</h2>
          <p>${movie.release_date}</p>
          <button onclick="showDetails(${movie.id})">Details</button>
        `;
        movieList.appendChild(movieItem);
      });
    });
});

function showDetails(movieID) {
  fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const movieDetails = document.getElementById('movieDetails');
      movieDetails.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.overview}</p>
        <p>Rating: ${data.vote_average}</p>
      `;
    });
}
