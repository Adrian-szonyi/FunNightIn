// When user clicks on generate button, once results are generated then an icon will appear to save results
// When user clicks on save icon, then it will be store into local storage and appear inthe favourites column
// When the user returns they will see their favourites in the third column
// User have the option of deleting all favourites or just one item.
// When the user clicks on a favourite, then the movie or meal will be retieved from the API and shown in the second column

// loading circle at generate button font awesome

// Global variables
var saveMovieBtn = document.querySelector("#save-movie");
var saveRecipeBtn = document.querySelector("#save-recipe");
var hideRecipe = document.querySelector("#hiddenRecipe");
var hideMovie = document.querySelector("#hiddenMovie");
var generateBtn = document.querySelector("#generate-button");
var movieTitle = document.querySelector("#movie-title");
var foodTitle = document.querySelector("#recipe-heading");
var favMovies = document.querySelector("#fav-movies");
var favRecipes = document.querySelector("#fav-recipes");
var clearAllStorage = document.querySelector("#clear-history");

var movieData;
var mealData;
var getMeal;

// Event Listeners
generateBtn.addEventListener("click", unhideColumn);
saveMovieBtn.addEventListener("click", saveMovie);
// saveRecipeBtn.addEventListener("click", saveRecipe);
saveRecipeBtn.addEventListener("click", saveMeal);
clearAllStorage.addEventListener("click", clearLocal);
favRecipes.addEventListener("click", getData);

// Unhide 2nd column content after 2 seconds
function unhideColumn() {
  setTimeout(function () {
    hideRecipe.classList.remove("hidden");
    hideMovie.classList.remove("hidden");
  }, 2000);
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

// Save favourite movie
function saveMovie() {
  var chosenMovie = movieTitle.textContent;
  var savedMovieTitles = localStorage.getItem("movie");
  if (
    !savedMovieTitles ||
    savedMovieTitles === null ||
    savedMovieTitles === "null"
  ) {
    savedMovieTitles = [];
  } else {
    savedMovieTitles = JSON.parse(savedMovieTitles);
  }
  if (savedMovieTitles.includes(chosenMovie)) return;
  savedMovieTitles.push(chosenMovie);
  localStorage.setItem("movie", JSON.stringify(savedMovieTitles));
  var newFavMovie = document.createElement("button");
  newFavMovie.classList.add("favouritesBtn");
  newFavMovie.textContent = chosenMovie;
  favMovies.appendChild(newFavMovie);
}

// Save favorite recipe
// function saveRecipe() {
//   var chosenRecipe = foodTitle.textContent;
//   var savedRecipeTitles = localStorage.getItem("recipe");
//   if (
//     !savedRecipeTitles ||
//     savedRecipeTitles === null ||
//     savedRecipeTitles === "null"
//   ) {
//     savedRecipeTitles = [];
//   } else {
//     savedRecipeTitles = JSON.parse(savedRecipeTitles);
//   }
//   if (savedRecipeTitles.includes(chosenRecipe)) return;
//   savedRecipeTitles.push(chosenRecipe);
//   localStorage.setItem("recipe", JSON.stringify(savedRecipeTitles));
//   var newFavRecipe = document.createElement("button");
//   newFavRecipe.classList.add("favouritesBtn");
//   newFavRecipe.textContent = chosenRecipe;
//   favRecipes.appendChild(newFavRecipe);
// }

// Get local storage & create buttons
function savedFav() {
  savedMovieTitles = localStorage.getItem("movie");
  // savedRecipeTitles = localStorage.getItem("recipe");
  savedRecipeTitles = localStorage.getItem("meal");
  if (savedMovieTitles) {
    savedMovieTitles = JSON.parse(savedMovieTitles);
    for (let index = 0; index < savedMovieTitles.length; index++) {
      var movieBtn = document.createElement("button");
      movieBtn.classList.add("favouritesBtn");
      movieBtn.innerHTML = savedMovieTitles[index];
      favMovies.appendChild(movieBtn);
    }
  }
  // if (savedRecipeTitles) {
  //   savedRecipeTitles = JSON.parse(savedRecipeTitles);
  //   console.log(savedRecipeTitles);
  //   for (let index = 0; index < savedRecipeTitles.length; index++) {
  //     var recipeBtn = document.createElement("button");
  //     recipeBtn.classList.add("favouritesBtn");
  //     recipeBtn.innerHTML = savedRecipeTitles[index];
  //     console.log(savedRecipeTitles[index]);
  //     favRecipes.appendChild(recipeBtn);
  //   }
  // }

  if (savedRecipeTitles) {
    savedRecipeTitles = JSON.parse(savedRecipeTitles);
    console.log(savedRecipeTitles);
    for (let index = 0; index < savedRecipeTitles.length; index++) {
      var recipeBtn = document.createElement("button");
      recipeBtn.classList.add("favouritesBtn");
      recipeBtn.setAttribute("data-id", savedRecipeTitles[index].idMeal);
      recipeBtn.innerHTML = savedRecipeTitles[index].strMeal;
      console.log(savedRecipeTitles[index]);
      favRecipes.appendChild(recipeBtn);
    }
  }
}
savedFav();

// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");

var foodPoster = document.querySelector("#food-poster");
var foodTitle = document.querySelector("#recipe-heading");
var ingredientEl = document.querySelector("#ingredients");
var methodText = document.querySelector("#method");

generateBtn.addEventListener("click", getRandomMeal);

async function getRandomMeal() {
  getMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  if (getMeal) {
    foodPoster.src = getMeal.meals[0].strMealThumb;
    foodTitle.innerText = getMeal.meals[0].strMeal;
    methodText.innerText = getMeal.meals[0].strInstructions;
  }
}

function saveMeal() {
  var chosenMeal = getMeal.meals[0];
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
  savedMeal.push(chosenMeal);
  localStorage.setItem("meal", JSON.stringify(savedMeal));
  var newMeal = document.createElement("button");
  newMeal.classList.add("favouritesBtn");
  newMeal.textContent = getMeal.meals[0].strMeal;
  newMeal.setAttribute("data-id", getMeal.meals[0].idMeal);
  favRecipes.appendChild(newMeal);
}

function getData(e) {
  var getMealData = JSON.parse(localStorage.getItem("meal"));
  var mealId = e.target.getAttribute("data-id");
  console.log(mealId);
  console.log(getMealData);

  var selected = getMealData.filter((meal) => meal.idMeal === mealId);

  if (selected.length > 0) {
    selected = selected[0];
  } // add error handling
  console.log("selected", selected);
  hideRecipe.classList.remove("hidden");
  foodPoster.src = selected.strMealThumb;
  foodTitle.innerText = selected.strMeal;
  methodText.innerText = selected.strInstructions;
}
