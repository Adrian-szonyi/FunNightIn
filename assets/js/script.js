$(function () {
  $("#diet").selectmenu();

  $("#genre").selectmenu();

  $("#releaseperiod").selectmenu();
});

// Read more recipe feature
$(".readmore-link").click(function (e) {
  // record if our text is expanded
  var isExpanded = $(e.target).hasClass("expand");

  //close all open paragraphs
  $(".readmore.expand").removeClass("expand");
  $(".readmore-link.expand").removeClass("expand");

  // if target wasn't expand, then expand it
  if (!isExpanded) {
    $(e.target).parent(".readmore").addClass("expand");
    $(e.target).addClass("expand");
  }
});

// Movie global variables
var generateBtn = document.querySelector("#generate-button");
var movieTitle = document.querySelector("#movie-title");
var overviewDiv = document.querySelector("#overview");
var filterBtn = document.querySelector("filter-button");
var newImage = document.querySelector("#Newimage");
var MovieImage = document.querySelector("#MoviePoster");
var genre = document.querySelector("#genre");
var releaseperiod = document.querySelector("#releaseperiod");
var Comedy = document.querySelector("#Comedy");
var movies;
var randommovie;
var movieData;
var hideMovie = document.querySelector("#hiddenMovie");
var favMovies = document.querySelector("#fav-movies");
var saveMovieBtn = document.querySelector("#save-movie");
// Food global variables
var selectDiet = document.querySelector("#diet");
var selectDietOption = selectDiet.value;
var foodTitle = document.querySelector("#recipe-heading");
var foodPoster = document.querySelector("#food-poster");
var foodTitle = document.querySelector("#recipe-heading");
var ingredientEl = document.querySelector("#ingredients");
var methodText = document.querySelector("#method");
var getMeal;
var randomMealId;
var foodPoster = document.querySelector("#food-poster");
var foodTitle = document.querySelector("#recipe-heading");
var ingredientEl = document.querySelector("#ingredients");
var methodText = document.querySelector("#method");
var hideRecipe = document.querySelector("#hiddenRecipe");
var saveRecipeBtn = document.querySelector("#save-recipe");
var favRecipes = document.querySelector("#fav-recipes");

// Clear local storage selector
var clearAllStorage = document.querySelector("#clear-history");

// Event Listeners
generateBtn.addEventListener("click", getRandomMeal);
generateBtn.addEventListener("click", unhideColumn);
generateBtn.addEventListener("click", getMovies);
saveRecipeBtn.addEventListener("click", saveMeal);
saveMovieBtn.addEventListener("click", saveMovie);
favRecipes.addEventListener("click", getRecipeData);
favMovies.addEventListener("click", getMovieData);
clearAllStorage.addEventListener("click", clearLocal);

// Unhide 2nd column content after 2 seconds
function unhideColumn() {
  setTimeout(function () {
    hideRecipe.classList.remove("hidden");
    hideMovie.classList.remove("hidden");
  }, 2000);
}

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

  var MaxReleaseDate = document.getElementById("releaseperiod").value;
  var MinReleaseDate = document.getElementById("releaseperiod").value;

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

  var pagedata = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=7113d8f1b2a86dd4b4fe2e64488fe988&sort_by=popularity.desc&primary_release_date.gte=" +
      MinReleaseDate +
      "&primary_release_date.lte=" +
      MaxReleaseDate +
      "&vote_count.gte=5000&with_genres=" +
      selectGenre +
      "&original_language=en-US"
  ).then((response) => response.json());

  if (pagedata.total_pages === 1) {
    var randompageint = 1;
  } else {
    var randompage = Math.floor(Math.random() * (pagedata.total_pages - 1));
  }
  if (pagedata.total_results > 19) {
    randommovie = Math.floor(Math.random() * (18 + 1));
  } else {
    randommovie = Math.floor(Math.random() * pagedata.total_results);
  }
  if (randompage === 0 || randompage === -1) {
    var randompage = Math.floor(Math.random() * (pagedata.total_pages - 1));
  }
  movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=7113d8f1b2a86dd4b4fe2e64488fe988&sort_by=popularity.desc&primary_release_date.gte=" +
      MinReleaseDate +
      "&primary_release_date.lte=" +
      MaxReleaseDate +
      "&vote_count.gte=5000&with_genres=" +
      selectGenre +
      "&original_language=en-US&page=" +
      randompageint
  ).then((response) => response.json());

  var movieposter =
    "https://image.tmdb.org/t/p/w500/" +
    movies.results[randommovie].poster_path;
  MovieImage.src = movieposter;
  movieTitle.textContent = movies.results[randommovie].original_title;
  overviewDiv.textContent = movies.results[randommovie].overview;
}

// Recipe API
async function getRandomMeal(url) {
  selectDietOption = selectDiet.value;
  console.log(selectDietOption);
  var type;
  if (selectDietOption === "") {
    url = `https://www.themealdb.com/api/json/v1/1/random.php`;
    type = "random";
  } else {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectDietOption}`;
    type = "filtered";
  }
  getMeal = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  // If filter is used, pick a random recipe from chosen array and retrieve content directly using recipe id - ingredients/method not available in filter category array.
  if (type === "filtered") {
    randomMealId = Math.floor(Math.random() * getMeal.meals.length);
    var idNumber = getMeal.meals[randomMealId].idMeal;
    console.log(idNumber);
    getMeal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    getIngredients(getMeal.meals[0]);
  } else {
    if (getMeal) {
      getIngredients(getMeal.meals[0]);
    }
  }
}
// Populate column 2 with recipe content
function getIngredients(meal) {
  foodPoster.src = meal.strMealThumb;
  foodTitle.innerText = meal.strMeal;
  methodText.innerText = meal.strInstructions;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
      );
    } else {
      break;
    }
  }
  ingredientEl.innerHTML = `${ingredients
    .map((ingredients) => `<li>${ingredients}</li>`)
    .join("")}`;
}

// Save recipe into local storage
function saveMeal() {
  var chosenMeal = getMeal.meals[0];
  console.log("meal:" + chosenMeal);
  var savedMeal = localStorage.getItem("meal");
  if (!savedMeal || savedMeal === null || savedMeal === "null") {
    savedMeal = [];
  } else {
    savedMeal = JSON.parse(savedMeal);
  }
  var selected = savedMeal.filter(
    (meal) => meal.idMeal === getMeal.meals[0].mealId
  );

  if (selected.length > 0) {
    return;
  }
  // Add new favourite recipe into local storage and create button
  savedMeal.push(chosenMeal);
  localStorage.setItem("meal", JSON.stringify(savedMeal));
  var newMeal = document.createElement("button");
  newMeal.classList.add("favouritesBtn");
  newMeal.textContent = getMeal.meals[0].strMeal;
  newMeal.setAttribute("data-id", getMeal.meals[0].idMeal);
  favRecipes.appendChild(newMeal);
}

// Save movie into local storage
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
  // Save new favourite movie into local storage and create button
  savedMovie.push(chosenMovie);
  localStorage.setItem("film", JSON.stringify(savedMovie));
  var newMovie = document.createElement("button");
  newMovie.classList.add("favouritesBtn");
  newMovie.textContent = chosenMovie.original_title;
  newMovie.setAttribute("data-id", chosenMovie.id);
  favMovies.appendChild(newMovie);
}

// Retrieve favourites from local storage and create buttons on page load
function savedFav() {
  savedMovieTitles = localStorage.getItem("film");
  savedRecipeTitles = localStorage.getItem("meal");
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
  if (savedRecipeTitles) {
    savedRecipeTitles = JSON.parse(savedRecipeTitles);
    for (let index = 0; index < savedRecipeTitles.length; index++) {
      var recipeBtn = document.createElement("button");
      recipeBtn.classList.add("favouritesBtn");
      recipeBtn.setAttribute("data-id", savedRecipeTitles[index].idMeal);
      recipeBtn.innerHTML = savedRecipeTitles[index].strMeal;
      favRecipes.appendChild(recipeBtn);
    }
  }
}
savedFav();

// Movie favourites buttons - when user clicks on a button, the content will populate column 2
function getMovieData(e) {
  // Retrieve local storage - Movies
  var getMovieData = JSON.parse(localStorage.getItem("film"));
  var movieId = e.target.getAttribute("data-id");
  var selected = getMovieData.filter((film) => film.id === parseInt(movieId));
  console.log(selected + "selected");

  if (selected.length > 0) {
    selected = selected[0];
  } // add error handling
  hideMovie.classList.remove("hidden");
  movieTitle.textContent = selected.original_title;
  overviewDiv.textContent = selected.overview;

  var movieposter = "https://image.tmdb.org/t/p/w500/" + selected.poster_path;
  MovieImage.src = movieposter;
}

// Recipe favourites buttons - when user clicks on a button, the content will populate column 2
function getRecipeData(e) {
  var getMealData = JSON.parse(localStorage.getItem("meal"));
  var mealId = e.target.getAttribute("data-id");
  var selected = getMealData.filter((meal) => meal.idMeal === mealId);

  if (selected.length > 0) {
    selected = selected[0];
  } // add error handling
  hideRecipe.classList.remove("hidden");
  foodPoster.src = selected.strMealThumb;
  foodTitle.innerText = selected.strMeal;
  methodText.innerText = selected.strInstructions;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (selected[`strIngredient${i}`]) {
      ingredients.push(
        `${selected[`strMeasure${i}`]} - ${selected[`strIngredient${i}`]}`
      );
    } else {
      break;
    }
  }
  ingredientEl.innerHTML = `${ingredients
    .map((ingredients) => `<li>${ingredients}</li>`)
    .join("")}`;
}

// Clear local storage
function clearLocal(params) {
  localStorage.clear("movie");
  while (favMovies.firstChild) {
    favMovies.removeChild(favMovies.lastChild);
  }
  localStorage.clear("recipe");
  while (favRecipes.firstChild) {
    favRecipes.removeChild(favRecipes.lastChild);
  }
}
