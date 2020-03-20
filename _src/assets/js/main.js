"use strict";

const button = document.querySelector(".js-button");
const input = document.querySelector(".js-input");
const searchContainer = document.querySelector(".js-container-main");
const favMoviesContainer = document.querySelector(".js-fav-films-container");

let searchedMovies = [];
let favMovies = [];

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
  searchContainer.innerHTML = "";
  let movieCode = "";
  for (let i = 0; i < searchedMovies.length; i++) {
    // console.log(searchedMovies[i].show.name);
    movieCode += `<article data-id="${searchedMovies[i].show.id}" class="film js-film">`;
    movieCode += `<img class="film-image"`;
    if (searchedMovies[i].show.image === null) {
      movieCode += `src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"`;
    } else {
      movieCode += `src="${searchedMovies[i].show.image.medium}"`;
    }
    movieCode += `alt=""`;
    movieCode += `>`;
    movieCode += `<p>${searchedMovies[i].show.name}</p>`;
    movieCode += `</article>`;
  }
  let moviesSelected = "";
  moviesSelected = moviesSelected + movieCode;
  searchContainer.innerHTML = moviesSelected;
  listenAddMoviesArticles();
}

function listenAddMoviesArticles() {
  const movieArticles = document.querySelectorAll(".js-film");
  for (const movieArticle of movieArticles) {
    movieArticle.addEventListener("click", addToFavorites);
  }
  console.log(movieArticles);
}

function addToFavorites(ev) {
  // const clickedFilm = ev.currentTarget.dataset.id;
  // const clickedFilmStyle = ev.currentTarget;
  // clickedFilmStyle.classList.toggle("culo");
  // console.log(clickedFilm);
  // console.log("holi");
  // for (let i = 0; i < searchedMovies.length; i++) {
  //   if (clickedFilm === searchedMovies[i]) {
  // o ya está dentro, no repetirla
  //     console.log(searchedMovies[i]);
  //     console.log("heheheh");
  //   } else {
  //     console.log("shit");
  //   }
  // }
  favMovies.push(searchedMovies[0]);
  console.log(favMovies);
  paintFavMovies();
}

function paintFavMovies() {
  favMoviesContainer.innerHTML = "";
  let favCode = "";
  for (let i = 0; i < favMovies.length; i++) {
    favCode += `<article class="fav-film">`;
    favCode += `<img `;
    favCode += `class="film-image-result"`;
    favCode += ` src="${favMovies[i].show.image.medium}"`;
    favCode += ` alt=""`;
    favCode += `/>`;
    favCode += `<p>${favMovies[i].show.name}</p>`;
    favCode += `</article>`;
  }

  let favoriteMovies = "";
  favoriteMovies = favoriteMovies + favCode;
  favMoviesContainer.innerHTML = favoriteMovies;
  addFavToLocalStorage();
}

function addFavToLocalStorage() {
  localStorage.setItem("Movie", JSON.stringify(favMovies));
}

button.addEventListener("click", getMovieInfo);
