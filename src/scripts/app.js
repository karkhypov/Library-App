import debounce from './utils';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b053d2e58901a03f116084d8a555610b';

const input = document.querySelector('input');
const output = document.querySelector('#output');

async function fetchMovies(query) {
  const response = await fetch(`${URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  let movies;
  if (response.ok) {
    movies = await response.json();
  } else {
    alert(`Error HTTP: ${response.status}`);
  }
  return movies.results;
}

const onInput = async e => {
  const movies = await fetchMovies(e.target.value);
  if (!movies) {
    output.innerHTML = '<h3>No results found</h3>';
    return;
  }
  output.innerHTML = '';

  movies.forEach(movie => {
    const div = document.createElement('div');

    div.innerHTML = `
      <img src='http://image.tmdb.org/t/p/w300/${movie.poster_path}' />
      <h1>${movie.title}</h1>
    `;

    output.appendChild(div);
  });
};

input.addEventListener('input', debounce(onInput));
