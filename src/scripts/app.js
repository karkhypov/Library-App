import debounce from './utils';

const URL = 'http://www.omdbapi.com/';
const API_KEY = '74508c55';

const input = document.querySelector('input');
const output = document.querySelector('#output');

async function fetchMovies(search) {
  const response = await fetch(`${URL}?apikey=${API_KEY}&s=${search}`);
  let movies;
  if (response.ok) {
    movies = await response.json();
    // console.log(movies);
    // if (movies.Error) return [];
  } else {
    alert(`Error HTTP: ${response.status}`);
  }
  return movies.Search;
}

const onInput = async e => {
  const movies = await fetchMovies(e.target.value);
  if (!movies) {
    output.innerHTML = '<h3>No results found</h3>';
    return;
  }
  output.innerHTML = '';

  for (const movie of movies) {
    const div = document.createElement('div');

    div.innerHTML = `
      <img src="${movie.Poster}" />
      <h1>${movie.Title}</h1>
    `;

    output.appendChild(div);
  }
};

input.addEventListener('input', debounce(onInput));
