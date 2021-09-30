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
var movieTitle = document.querySelector("#movie-title");
var overviewDiv = document.querySelector("#overview");
// //Generated recipe content
// var recipeTitle = document.querySelector("recipe-title");
// var ingredientEl = document.querySelector("ingredients");
// var methodDiv = document.querySelector("method");

var filterBtn = document.querySelector("filter-button");

var newImage = document.querySelector("#Newimage");
var MovieImage = document.querySelector("#MoviePoster");

generateBtn.addEventListener("click", getMovies);

async function getMovies() {
  var randompage = Math.floor(Math.random() * 20);
  var randommovie = Math.floor(Math.random() * 19);
  var movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&vote_count.gte10000&original_language=en-US&page=" +
      randompage +
      "&api_key=7113d8f1b2a86dd4b4fe2e64488fe988"
  ).then((response) => response.json());
  movies.results.length = 200;
  var movieposter =
    "https://image.tmdb.org/t/p/w500/" +
    movies.results[randommovie].poster_path;
  MovieImage.src = movieposter;


  console.log(movies)
  console.log(randommovie)
  console.log(movies.results[100])
  console.log(movies.results[randommovie].original_title)
  movieTitle.textContent = movies.results[randommovie].original_title
  overviewDiv.textContent = movies.results[randommovie].overview



  console.log(movies);
  console.log(randommovie);
  console.log(movies.results[100]);
  console.log(movies.results[randommovie].original_title);
  movieTitle.textContent = movies.results[randommovie].original_title;
  overviewDiv.textContent = movies.results[randommovie].overview;
}


// function getRandomMeal() {
//   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
//   } 
