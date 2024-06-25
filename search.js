document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  window.location.href = `results.html?query=${query}`;
});
