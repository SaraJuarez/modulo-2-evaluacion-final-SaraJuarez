"use strict";

const button = document.querySelector(".js-button");
const input = document.querySelector(".js-input");
const searchContainer = document.querySelector(".js-container-main");
const favMoviesContainer = document.querySelector(".js-fav-films-container");
const resetButton = document.querySelector(".js-reset-button");

let searchedMovies = [];
let favMovies = [];

// FUNCIÓN QUE RECOGE LOS DATOS DE LA API EN SEARCHEDMOVIES Y LLAMA A LA FUNCIÓN QUE PINTA LOS RESULTADOS DE BÚSQUEDA

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

// ESTA FUNCIÓN PINTA LOS RESULTADOS DE BÚSQUEDA, VERIFICA SI ALGUNA PELÍCULA ESTÁ EN FAVORITOS PARA CAMBIAR SU COLOR Y LLAMA A LA FUNCIÓN QUE AÑADE LOS LISTENERS A CADA UNO DE LOS RESULTADOS

function paintSearchedFilms() {
  searchContainer.innerHTML = "";
  let movieCode = "";
  for (let i = 0; i < searchedMovies.length; i++) {
    movieCode += `<article data-id="${searchedMovies[i].show.id}" class="film js-film" id="${searchedMovies[i].show.id}">`;
    movieCode += `<img class="film-image"`;
    if (searchedMovies[i].show.image === null) {
      movieCode += `src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"`;
    } else {
      movieCode += `src="${searchedMovies[i].show.image.medium}"`;
    }
    movieCode += `alt=""`;
    movieCode += `>`;
    movieCode += `<p class="text">${searchedMovies[i].show.name}</p>`;
    movieCode += `</article>`;
  }
  let moviesSelected = "";
  moviesSelected = moviesSelected + movieCode;
  searchContainer.innerHTML = moviesSelected;

  for (let i = 0; i < searchedMovies.length; i++) {
    for (let index = 0; index < favMovies.length; index++) {
      if (searchedMovies[i].show.id === favMovies[index].show.id) {
        let movieToPaint = searchedMovies[i].show.id;
        const movieToPaintHtml = document.getElementById(movieToPaint);
        movieToPaintHtml.classList.add("selected");
      }
    }
  }
  listenAddMoviesArticles();
}
// FUNCIÓN QUE AÑADE LOS LISTENERS A LOS RESULTADOS DE BÚSQUEDA

function listenAddMoviesArticles() {
  const movieArticles = document.querySelectorAll(".js-film");
  for (const movieArticle of movieArticles) {
    movieArticle.addEventListener("click", addToFavorites);
  }
}

// FUNCIÓN QUE AÑADE A FAVORITOS DESDE LOS DATOS DE SEARCHED MOVIES, VERIFICA QUE NO ESTABA ANTES EN FAVORITOS Y PINTA LOS FAVORITOS

function addToFavorites(ev) {
  const clickedFilmStyle = ev.currentTarget;
  clickedFilmStyle.classList.toggle("selected");

  const clickedFilm = ev.currentTarget.dataset.id;
  let foundMovie;

  for (let i = 0; i < searchedMovies.length; i++) {
    if (parseInt(clickedFilm) === searchedMovies[i].show.id) {
      foundMovie = searchedMovies[i];
    }
  }

  let alreadyFavMovies;

  for (let i = 0; i < favMovies.length; i++) {
    if (parseInt(clickedFilm) === favMovies[i].show.id) {
      alreadyFavMovies = favMovies[i];
      favMovies.splice(i, 1);
      paintFavMovies();
      return alreadyFavMovies;
    } else {
      alreadyFavMovies = undefined;
    }
  }

  if (alreadyFavMovies === undefined) {
    favMovies.push(foundMovie);
  }

  paintFavMovies();
}

// FUNCIÓN QUE PINTA LAS PELÍCULAS FAVORITAS, LLAMA A LA FUNCIÓN QUE AÑADE LISTERNERS A LOS BOTONES LATERALES E INCLUYE LA INFORMACIÓN DE PELÍCULAS FAVORITAS AL LOCAL STORAGE

function paintFavMovies() {
  let favCode = "";
  for (let i = 0; i < favMovies.length; i++) {
    favCode += `<article class="fav-film" id="${favMovies[i].show.id}">`;
    favCode += `<img `;
    favCode += `class="film-image-result"`;
    if (favMovies[i].show.image === null) {
      favCode += `src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"`;
    } else {
      favCode += `src="${favMovies[i].show.image.medium}"`;
    }
    favCode += ` alt=""`;
    favCode += `/>`;
    favCode += `<p class="text">${favMovies[i].show.name}</p>`;
    favCode += `<i class="far fa-times-circle js-retire-button"></i> `;
    favCode += `</article>`;
  }
  let favoriteMovies = "";
  favoriteMovies = favCode;
  favMoviesContainer.innerHTML = favoriteMovies;
  listenRetireButton();
  addFavToLocalStorage();
}

// FUNCIÓN QUE AÑADE LOS LISTERNERS A LOS BOTONES LATERALES DE LOS FAVORITOS

function listenRetireButton() {
  const retireButtons = document.querySelectorAll(".js-retire-button");
  for (const retireButton of retireButtons) {
    retireButton.addEventListener("click", retireFav);
  }
}

// FUNCIÓN QUE RETIRA LA PELÍCULA DE FAVORITOS DESDE EL BOTÓN LATERAL DE FAVORITOS

function retireFav(ev) {
  const clickedFavToRetire = ev.currentTarget;
  const mother = clickedFavToRetire.parentElement;
  const motherId = mother.id;
  console.log(motherId);
  for (let i = 0; i < favMovies.length; i++) {
    if (parseInt(motherId) === favMovies[i].show.id) {
      let movieToRetire = favMovies[i];
      favMovies.splice(i, 1);
      paintFavMovies();
      paintSearchedFilms();
    }
  }
}

// ESTA FUNCIÓN SE ENCARGA DE AÑADIR LOS LISTENERS A LAS PELIS FAVORITAS QUE ESTABAN YA ALMACENADAS EN LOCALSTORAGE

listenRetireButton();

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

// LISTENER Y FUNCIÓN DEL BOTÓN DE RESET, QUE REPINTA LAS BÚSQUEDAS PARA QUE LAS RETIRADAS NO APAREZCAN CON LA CLASE SELECTED

function resetFavs() {
  favMovies = [];
  localStorage.setItem("Movie", JSON.stringify(favMovies));
  favMoviesContainer.innerHTML = "";
  paintSearchedFilms();
}

resetButton.addEventListener("click", resetFavs);
