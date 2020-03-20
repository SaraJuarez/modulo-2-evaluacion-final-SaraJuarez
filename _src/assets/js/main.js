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
  const clickedFilmStyle = ev.currentTarget;
  clickedFilmStyle.classList.toggle("culo");

  const clickedFilm = ev.currentTarget.dataset.id;

  console.log(clickedFilm);
  console.log("holi");
  for (let i = 0; i < searchedMovies.length; i++) {
    if (clickedFilm === favMovies[i].show.id) {
      // o ya está dentro, no repetirla
      console.log(searchedMovies[i]);
      //     console.log("heheheh");
    } else {
      console.log("shit");
    }
  }
  favMovies.push(searchedMovies[0]);
  console.log(favMovies);
  paintFavMovies();
}

function paintFavMovies() {
  // favMoviesContainer.innerHTML = "";
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
  favMoviesContainer.innerHTML += favoriteMovies;
  addFavToLocalStorage();
}

// ESTA FUNCIÓN RECOGE AL ARRANCAR LA PÁGINA LAS PELIS FAVORITAS DEL LOCAL STORAGE

function getFavFromLocalStorage() {
  let arrLocalStorage = JSON.parse(localStorage.getItem("Movie"));
  favMoviesContainer.innerHTML = "";
  let favCode = "";
  for (let i = 0; i < arrLocalStorage.length; i++) {
    favCode += `<article class="fav-film">`;
    favCode += `<img `;
    favCode += `class="film-image-result"`;
    favCode += ` src="${arrLocalStorage[i].show.image.medium}"`;
    favCode += ` alt=""`;
    favCode += `/>`;
    favCode += `<p>${arrLocalStorage[i].show.name}</p>`;
    favCode += `</article>`;
  }
  let favoriteMovies = "";
  favoriteMovies = favoriteMovies + favCode;
  favMoviesContainer.innerHTML = favoriteMovies;
}
getFavFromLocalStorage();

// ESTA FUNCIÓN INCLUYE EN LOCAL STORAGE LAS PELIS INCLUIDAS EN EL ARRAY FAVMOVIES

function addFavToLocalStorage() {
  localStorage.setItem("Movie", JSON.stringify(favMovies));
}

// LISTENER DEL BOTÓN SEARCH PARA BUSCAR SERIES

button.addEventListener("click", getMovieInfo);
