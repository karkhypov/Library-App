import { debounce, lazyImages } from './utils';

require('dotenv').config();

const input = document.querySelector('input');
const dropdown = document.querySelector('#dropdown');

const placeholderSm = 'https://placeholder.pics/svg/75x115/DEDEDE/555555/n/a';

async function fetchMovies(query) {
  const response = await fetch(`${process.env.URL}/search/movie?api_key=${process.env.API_KEY}&query=${query}`);
  let movies;

  if (response.ok) {
    movies = await response.json();
  } else {
    alert(`Error HTTP: ${response.status}`);
  }
  return movies.results;
}

const onInput = async e => {
  if (!e.target.value) {
    dropdown.innerHTML = '';
    dropdown.classList.remove('open');
    return;
  }

  const movies = await fetchMovies(e.target.value);
  if (movies.length === 0) {
    dropdown.classList.add('open');
    dropdown.innerHTML = `<h5 style='padding:15px;'>No results found</h5>`;
    return;
  }
  dropdown.innerHTML = '';

  movies.forEach(movie => {
    const li = document.createElement('li');

    li.innerHTML = `
    <a href='#'>
    <img data-src='${process.env.IMG_W154}${movie.poster_path}' src=${placeholderSm} alt='movie poster'  />
    <span>${movie.title}</span>
    <span>${movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}</span>
    </a>
    `;

    if (!movie.poster_path) {
      li.querySelector('img').setAttribute('data-src', placeholderSm);
    }

    dropdown.appendChild(li);
  });

  dropdown.classList.add('open');
  lazyImages();
};

input.addEventListener('input', debounce(onInput));
