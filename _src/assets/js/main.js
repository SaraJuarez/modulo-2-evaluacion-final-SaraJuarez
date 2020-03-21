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
  console.log("estoy entrando en pintar películas");

  for (let i = 0; i < searchedMovies.length; i++) {
    for (let index = 0; index < favMovies.length; index++) {
      if (searchedMovies[i].show.id === favMovies[index].show.id) {
        console.log("coincide la película");
      }
    }
  }

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
  let foundMovie;

  for (let i = 0; i < searchedMovies.length; i++) {
    if (parseInt(clickedFilm) === searchedMovies[i].show.id) {
      foundMovie = searchedMovies[i];
    }
  }

  // tengo que recoger en una variable los datos que quiero pusear
  let alreadyFavMovies;

  for (let i = 0; i < favMovies.length; i++) {
    if (parseInt(clickedFilm) === favMovies[i].show.id) {
      alreadyFavMovies = favMovies[i];

      // aquí quitar color rojo de la seleccionada
      favMovies.splice(i, 1);

      console.log("mierda en salsa");
      paintFavMovies();
      return alreadyFavMovies;
    } else {
      alreadyFavMovies = undefined;
      // añadir color a la seleccionada
    }
  }
  console.log(alreadyFavMovies);
  if (alreadyFavMovies === undefined) {
    favMovies.push(foundMovie);
  }

  // for (let i = 0; i < favMovies.length; i++) {
  //   if (foundMovie.show.id === favMovies[i].show.id) {
  //     console.log("duplicada");
  //   } else {
  //     favMovies.push(foundMovie);
  //   }
  // }
  if (favMovies.length != 0) {
  } else {
    favMovies.push(foundMovie);
  }

  paintFavMovies();
}

function paintFavMovies() {
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
  favoriteMovies = favCode;
  favMoviesContainer.innerHTML = favoriteMovies;
  addFavToLocalStorage();
}

// ESTA FUNCIÓN RECOGE AL ARRANCAR LA PÁGINA LAS PELIS FAVORITAS DEL LOCAL STORAGE

function getFavFromLocalStorage() {
  let arrLocalStorage = JSON.parse(localStorage.getItem("Movie"));

  if (arrLocalStorage != null) {
    favMovies = arrLocalStorage;
    paintFavMovies();
  }
}
getFavFromLocalStorage();

// ESTA FUNCIÓN INCLUYE EN LOCAL STORAGE LAS PELIS INCLUIDAS EN EL ARRAY FAVMOVIES

function addFavToLocalStorage() {
  localStorage.setItem("Movie", JSON.stringify(favMovies));
}

// LISTENER DEL BOTÓN SEARCH PARA BUSCAR SERIES

button.addEventListener("click", getMovieInfo);
