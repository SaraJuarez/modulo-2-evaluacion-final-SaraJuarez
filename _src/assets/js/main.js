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
  for (let i = 0; i < array.length; i++) {
    if (clickedFilm === favMovies[i].show.id) {
    // entonces recorres el array favMovies de nuevo y retiras el elemento que coincide. para eso debemos conocer su posición
    for (let film = 0; film < favMovies.length; film++) {
      indexOfClickedFilm = favMovies.indexOf('favmovies[i].show.id')
      console.log(indexOfClickedFilm);
      
    }

    }
    else {
      for (let index = 0; index < searchedMovies.length; index++) {
        if (clickedFilm === searchedMovies[i].show.id) {
          favMovies.push(searchedMovies[i]);
          
        }
        
      }
      // favMovies.push(searchedMovies)
    }
  
  // favMovies.push(searchedMovies[0]);
  console.log(favMovies);
  paintFavMovies();
}

function paintFavMovies() {
  let favCode = "";
  for (let i = 0; i < favMovies.length; i++) {
    favCode += `<article class="fav-film">`;
    favCode += `<img `;
    favCode += `class="film-image-result"`;
    favCode += ` src="${favMovies[0].show.image.medium}"`;
    favCode += ` alt=""`;
    favCode += `/>`;
    favCode += `<p>${favMovies[0].show.name}</p>`;
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
