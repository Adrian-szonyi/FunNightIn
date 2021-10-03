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
var Comedy = document.querySelector("#Comedy")



generateBtn.addEventListener("click", getMovies);

async function getMovies() {

  var selectGenre = document.getElementById("genre").value
    if (selectGenre === "Comedy") {
      selectGenre = 35;
    }
    else if (selectGenre === "Action") {
     selectGenre = 28;
   }
   else if (selectGenre === "Drama") {
     selectGenre = 18;
   }
   else if (selectGenre === "Family") {
     selectGenre = 10751;
   }
   else if (selectGenre === "Romance") {
     selectGenre = 10749;
   }
   else {
    selectGenre = 35;
   }
   var MaxReleaseDate = document.getElementById("releaseperiod").value
   var MinReleaseDate = document.getElementById("releaseperiod").value
   if (MaxReleaseDate === "2011 - 2021") {
    MaxReleaseDate = "2021-09-09"
    MinReleaseDate = "2011-01-01"
   }
   else if (MaxReleaseDate === "2000 - 2010") {
    MaxReleaseDate = "2011-01-01"
    MinReleaseDate = "2000-01-01"
  }
  else if (MaxReleaseDate === "1989 - 1999") {
    MaxReleaseDate = "2000-01-01"
    MinReleaseDate = "1989-01-01"
  }
 else {
  MaxReleaseDate = "2021-09-09"
  MinReleaseDate = "2011-01-01"
  console.log(randompage)
 }

if (MaxReleaseDate === "2021-09-09" && selectGenre === "Romance") {
  MaxReleaseDate = "2021-09-09"
  MinReleaseDate = "2011-01-01"
  var randompage = 1;
  console.log(randompage)
}

 console.log(MaxReleaseDate)

  var randommovie = Math.floor((Math.random() * 18)+1);
  console.log(selectGenre)

  var movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=7113d8f1b2a86dd4b4fe2e64488fe988&sort_by=popularity.desc&release_date.gte=" + MinReleaseDate + "&release_date.lte=" + MaxReleaseDate + "&vote_count.gte=5000&with_genres=" + selectGenre + "&original_language=en-US&page=" +
      randompage

  ).then((response) => response.json());

  var movieposter =
    "https://image.tmdb.org/t/p/w500/" +
    movies.results[randommovie].poster_path;
  MovieImage.src = movieposter;

  console.log(movies);
  console.log(randommovie);
  console.log(movies.results[100]);
  console.log(movies.results[randommovie].original_title);
  movieTitle.textContent = movies.results[randommovie].original_title;
  console.log(movies.results[randommovie].original_title);
  overviewDiv.textContent = movies.results[randommovie].overview;

  console.log(movies);
  console.log(randommovie);
  console.log(movies.results[100]);
  console.log(movies.results[randommovie].original_title);
  movieTitle.textContent = movies.results[randommovie].original_title;
  overviewDiv.textContent = movies.results[randommovie].overview;
}

