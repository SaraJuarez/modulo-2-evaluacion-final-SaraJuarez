"use strict";

const button = document.querySelector(".js-button");
const input = document.querySelector(".js-input");
const searchContainer = document.querySelector(".js-container-main");

let searchedMovies = [];

function getMovieInfo() {
  let filmInput;
  filmInput = input.value;
  let url = `http://api.tvmaze.com/search/shows?q=${filmInput}`;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      searchedMovies = data;
      paintSearchedFilms();
    });
}

function paintSearchedFilms() {
  let movieCode = "";
  for (let i = 0; i < searchedMovies.length; i++) {
    console.log(searchedMovies[i].show.name);
    movieCode += `<article class="film">`;
    movieCode += `<p>${searchedMovies[i].show.name}</p>`;
    movieCode += `</article>`;
  }
  let moviesSelected = "";
  moviesSelected = moviesSelected + movieCode;
  searchContainer.innerHTML = moviesSelected;
}

// paintSearchedFilms();

// function getSearchedFilmsHtmlCode() {
//   let searchedFilmCode = "";
//   searchedFilmCode += `<article class="film">`;
//   searchedFilmCode += `<img`;
//   searchedFilmCode += `class="film-image"`;
//   searchedFilmCode += `src="https://www.cinetecamadrid.com/sites/default/files/styles/imagenes_medianas/public/activity/image/Carmen-de-carabanchel-cartel.jpg?itok=4xwMxYsJ"`;
//   searchedFilmCode += `alt=""/>`;
//   searchedFilmCode += `<p>${searchedMovies[i].show.name}</p>`;
//   searchedFilmCode += `</article>`;
//   console.log(searchedFilmCode);
//   return searchedFilmCode;
// }

button.addEventListener("click", getMovieInfo);
