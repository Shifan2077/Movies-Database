const apiKey = 'cf718a3e3e187f475aa3f100b8c305cd';
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const movieID = params.get('movieID');

  fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const movieDetails = document.getElementById('movieDetails');
      const posterPath = data.poster_path ? `${baseImageUrl}${data.poster_path}` : 'placeholder_image_url'; // Replace 'placeholder_image_url' with a URL to a placeholder image
      movieDetails.innerHTML = `
        <img src="${posterPath}" alt="${data.title} poster">
        <h2>${data.title}</h2>
        <p>${data.overview}</p>
        <p>Rating: ${data.vote_average}</p>
        <h3>Cast:</h3>
        <div id="castList"></div>
      `;
      fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`)
        .then(response => response.json())
        .then(creditsData => {
          const castList = document.getElementById('castList');
          castList.innerHTML = '';
          creditsData.cast.slice(0, 5).forEach(cast => { // Limiting to top 5 cast members
            const castItem = document.createElement('div');
            const castImagePath = cast.profile_path ? `${baseImageUrl}${cast.profile_path}` : 'placeholder_image_url'; // Replace 'placeholder_image_url' with a URL to a placeholder image
            castItem.innerHTML = `
              <img src="${castImagePath}" alt="${cast.name} photo" style="max-width: 50px; margin-right: 10px; border-radius: 5px;">
              <p>${cast.name} as ${cast.character}</p>
            `;
            castList.appendChild(castItem);
          });
        });
    });
});
