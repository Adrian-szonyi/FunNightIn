// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");

$(function () {
  $("#diet").selectmenu();

  $("#genre").selectmenu();

  $("#rating").selectmenu();
});

// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button

// var filterBtn = document.querySelector("#filter-button");
// //Generated movie content
// var movieTitle = document.querySelector("movie-title");
// var overviewDiv = document.querySelector("overview");
// //Generated recipe content
// var recipeTitle = document.querySelector("recipe-title");
// var ingredientEl = document.querySelector("ingredients");
// var methodDiv = document.querySelector("method");

var filterBtn = document.querySelector("filter-button");

var newImage = document.querySelector("#Newimage");
var MovieImage = document.querySelector("#Movieposter");
async function getMovies() {
  var randommovie = Math.floor(Math.random() * 1000);
  var movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7113d8f1b2a86dd4b4fe2e64488fe988"
  ).then((response) => response.json());
  console.log(movies);
  console.log(randommovie);
  var movieposter =
    "https://image.tmdb.org/t/p/w500/" + movies.results[0].poster_path;
  console.log(movies.results[0].poster_path);
  console.log(movieposter);
  MovieImage.src = movieposter;

  //   console.log(movieposter)
}

getMovies();

//Array.map

generateBtn.addEventListener("click", getRandomMeal);

function getRandomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
