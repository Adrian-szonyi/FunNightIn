// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");

$(function () {
  $("#diet").selectmenu();

  $("#genre").selectmenu();

  $("#releaseperiod").selectmenu();
});

// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button

// var filterBtn = document.querySelector("#filter-button");
// //Generated movie content
var movieTitle = document.querySelector("#movie-title");
var overviewDiv = document.querySelector("#overview");
// //Generated recipe content
// var recipeTitle = document.querySelector("recipe-title");
// var ingredientEl = document.querySelector("ingredients");
// var methodDiv = document.querySelector("method");

var filterBtn = document.querySelector("filter-button");

var newImage = document.querySelector("#Newimage");
var MovieImage = document.querySelector("#MoviePoster");

var genre = document.querySelector("#genre");
var releaseperiod = document.querySelector("#releaseperiod");
var Comedy = document.querySelector("#Comedy");
var movies;
var randommovie;


generateBtn.addEventListener("click", getMovies);

async function getMovies() {
  var selectGenre = document.getElementById("genre").value;
  if (selectGenre === "Comedy") {
    selectGenre = 35;
  } else if (selectGenre === "Action") {
    selectGenre = 28;
  } else if (selectGenre === "Drama") {
    selectGenre = 18;
  } else if (selectGenre === "Family") {
    selectGenre = 10751;
  } else if (selectGenre === "Romance") {
    selectGenre = 10749;
  } else {
    selectGenre = 35;
  }
  var MaxReleaseDate= document.getElementById("releaseperiod").value;
  var MinReleaseDate= document.getElementById("releaseperiod").value;
  if (MaxReleaseDate === "2011 - 2021") {
    MaxReleaseDate = "2021-09-09";
    MinReleaseDate = "2011-01-01";
  } else if (MaxReleaseDate === "2000 - 2010") {
    MaxReleaseDate = "2011-01-01";
    MinReleaseDate = "2000-01-01";

  } else if (MaxReleaseDate === "1989 - 1999") {
    MaxReleaseDate = "2000-01-01";
    MinReleaseDate = "1989-01-01";
  } else {
    MaxReleaseDate = "2021-09-09";
    MinReleaseDate = "2011-01-01";
 
  }


  
  console.log(selectGenre);
console.log(MinReleaseDate)
console.log(MaxReleaseDate)
  pagedata = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=7113d8f1b2a86dd4b4fe2e64488fe988&sort_by=popularity.desc&primary_release_date.gte=" + MinReleaseDate + "&primary_release_date.lte=" + MaxReleaseDate + "&vote_count.gte=5000&with_genres=" +
      selectGenre +
      "&original_language=en-US"
  ).then((response) => response.json());

if (pagedata.total_pages === 1) {
  var randompageint = 1
}
else {
  var randompage = Math.floor(Math.random()*(pagedata.total_pages - 1));
  console.log(randompageint)
}
if (pagedata.total_results > 19) {
randommovie = Math.floor(Math.random() *(18 + 1));
}
else {
  randommovie = Math.floor(Math.random() *pagedata.total_results);
}
if (randompage === 0 || randompage === -1 ) {
  var randompage = Math.floor(Math.random()*(pagedata.total_pages - 1));
}
  movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=7113d8f1b2a86dd4b4fe2e64488fe988&sort_by=popularity.desc&primary_release_date.gte=" + MinReleaseDate + "&primary_release_date.lte=" + MaxReleaseDate + "&vote_count.gte=5000&with_genres=" +
      selectGenre +
      "&original_language=en-US&page=" + randompageint).then((response) => response.json());

  console.log(randompageint)

  var movieposter =
    "https://image.tmdb.org/t/p/w500/" +
    movies.results[randommovie].poster_path;
  MovieImage.src = movieposter;

  console.log(JSON.parse(JSON.stringify(movies.results[randommovie])));

  console.log(movies);

  console.log(movies.results[randommovie].original_title);
  movieTitle.textContent = movies.results[randommovie].original_title;
  overviewDiv.textContent = movies.results[randommovie].overview;
}

// Lily code
var hideMovie = document.querySelector("#hiddenMovie");
var favMovies = document.querySelector("#fav-movies");
var saveMovieBtn = document.querySelector("#save-movie");
saveMovieBtn.addEventListener("click", saveMovie);
favMovies.addEventListener("click", getData);

function saveMovie() {
  var chosenMovie = movies.results[randommovie];
  var savedMovie = localStorage.getItem("film");
  if (!savedMovie || savedMovie === null || savedMovie === "null") {
    savedMovie = [];
  } else {
    savedMovie = JSON.parse(savedMovie);
  }
  var selected = savedMovie.filter(
    (film) => film.id === movies.results[randommovie].id
  );

  if (selected.length > 0) {
    return;
  }
  savedMovie.push(chosenMovie);
  localStorage.setItem("film", JSON.stringify(savedMovie));
  var newMovie = document.createElement("button");
  newMovie.classList.add("favouritesBtn");
  newMovie.textContent = chosenMovie.original_title;
  newMovie.setAttribute("data-id", chosenMovie.id);
  favMovies.appendChild(newMovie);
}

function savedFav() {
  savedMovieTitles = localStorage.getItem("film");
  if (savedMovieTitles) {
    savedMovieTitles = JSON.parse(savedMovieTitles);
    for (let index = 0; index < savedMovieTitles.length; index++) {
      var movieBtn = document.createElement("button");
      movieBtn.classList.add("favouritesBtn");
      movieBtn.innerHTML = savedMovieTitles[index].original_title;
      movieBtn.setAttribute("data-id", savedMovieTitles[index].id);
      favMovies.appendChild(movieBtn);
    }
  }
}
savedFav();

function getData(e) {
  var getMovieData = JSON.parse(localStorage.getItem("film"));
  console.log(getMovieData);
  var movieId = e.target.getAttribute("data-id");
  console.log(movieId);

  var selected = getMovieData.filter((film) => film.id === parseInt(movieId));
  console.log(selected + "selected");
  if (selected.length > 0) {
    selected = selected[0];
    console.log(selected);
  } // add error handling
  hideMovie.classList.remove("hidden");
  movieTitle.textContent = selected.original_title;
  overviewDiv.textContent = selected.overview;

  var movieposter = "https://image.tmdb.org/t/p/w500/" + selected.poster_path;
  MovieImage.src = movieposter;
}
