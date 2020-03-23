"use strict";const button=document.querySelector(".js-button"),input=document.querySelector(".js-input"),searchContainer=document.querySelector(".js-container-main"),favMoviesContainer=document.querySelector(".js-fav-films-container"),resetButton=document.querySelector(".js-reset-button");let searchedMovies=[],favMovies=[];function getMovieInfo(){let e;e=input.value,fetch(`//api.tvmaze.com/search/shows?q=${e}`).then((function(e){return e.json()})).then((function(e){searchedMovies=e,paintSearchedFilms()}))}function paintSearchedFilms(){searchContainer.innerHTML="";let e="";for(let t=0;t<searchedMovies.length;t++)e+=`<article data-id="${searchedMovies[t].show.id}" class="film js-film" id="${searchedMovies[t].show.id}">`,e+='<img class="film-image"',null===searchedMovies[t].show.image?e+='src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"':e+=`src="${searchedMovies[t].show.image.medium}"`,e+='alt=""',e+=">",e+=`<p class="text">${searchedMovies[t].show.name}</p>`,e+="</article>";let t="";t+=e,searchContainer.innerHTML=t;for(let e=0;e<searchedMovies.length;e++)for(let t=0;t<favMovies.length;t++)if(searchedMovies[e].show.id===favMovies[t].show.id){let t=searchedMovies[e].show.id;document.getElementById(t).classList.add("selected")}listenAddMoviesArticles()}function listenAddMoviesArticles(){const e=document.querySelectorAll(".js-film");for(const t of e)t.addEventListener("click",addToFavorites)}function addToFavorites(e){e.currentTarget.classList.toggle("selected");const t=e.currentTarget.dataset.id;let i,s;for(let e=0;e<searchedMovies.length;e++)parseInt(t)===searchedMovies[e].show.id&&(i=searchedMovies[e]);for(let e=0;e<favMovies.length;e++){if(parseInt(t)===favMovies[e].show.id)return s=favMovies[e],favMovies.splice(e,1),paintFavMovies(),s;s=void 0}void 0===s&&favMovies.push(i),paintFavMovies()}function paintFavMovies(){let e="";for(let t=0;t<favMovies.length;t++)e+=`<article class="fav-film" id="${favMovies[t].show.id}">`,e+="<img ",e+='class="film-image-result"',null===favMovies[t].show.image?e+='src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"':e+=`src="${favMovies[t].show.image.medium}"`,e+=' alt=""',e+="/>",e+=`<p class="text">${favMovies[t].show.name}</p>`,e+='<i class="far fa-times-circle js-retire-button"></i> ',e+="</article>";let t="";t=e,favMoviesContainer.innerHTML=t,listenRetireButton(),addFavToLocalStorage()}function listenRetireButton(){const e=document.querySelectorAll(".js-retire-button");for(const t of e)t.addEventListener("click",retireFav)}function retireFav(e){const t=e.currentTarget.parentElement.id;for(let e=0;e<favMovies.length;e++)if(parseInt(t)===favMovies[e].show.id){favMovies[e];favMovies.splice(e,1),paintFavMovies(),paintSearchedFilms()}}function getFavFromLocalStorage(){let e=JSON.parse(localStorage.getItem("Movie"));null!=e&&(favMovies=e,paintFavMovies())}function addFavToLocalStorage(){localStorage.setItem("Movie",JSON.stringify(favMovies))}function resetFavs(){favMovies=[],localStorage.setItem("Movie",JSON.stringify(favMovies)),favMoviesContainer.innerHTML="",paintSearchedFilms()}listenRetireButton(),getFavFromLocalStorage(),button.addEventListener("click",getMovieInfo),resetButton.addEventListener("click",resetFavs);