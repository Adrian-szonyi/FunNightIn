// When user clicks on generate button, once results are generated then an icon will appear to save results
// When user clicks on save icon, then it will be store into local storage and appear inthe favourites column
// When the user returns they will see their favourites in the third column
// User have the option of deleting all favourites or just one item.
// When the user clicks on a favourite, then the movie or meal will be retieved from the API and shown in the second column

// loading circle at generate button font awesome

var saveMovieBtn = document.querySelector("#save-movie");
var saveRecipeBtn = document.querySelector("#save-recipe");
var hideColumn2 = document.querySelector("#hidden");
var generateBtn = document.querySelector("#generate-button");
var movieTitle = document.querySelector("#movie-title");
var foodTitle = document.querySelector("#recipe-heading");
var favMovies = document.querySelector("#fav-movies");
var favRecipes = document.querySelector("#fav-recipes");

generateBtn.addEventListener("click", unhideColumn);

function unhideColumn(params) {
  setTimeout(function () {
    hideColumn2.classList.remove("hidden");
  }, 2000);
}
saveMovieBtn.addEventListener("click", saveMovie);
saveRecipeBtn.addEventListener("click", saveRecipe);

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

function saveRecipe() {
  var chosenRecipe = foodTitle.textContent;
  var savedRecipeTitles = localStorage.getItem("recipe");
  if (
    !savedRecipeTitles ||
    savedRecipeTitles === null ||
    savedRecipeTitles === "null"
  ) {
    savedRecipeTitles = [];
  } else {
    savedRecipeTitles = JSON.parse(savedRecipeTitles);
  }
  if (savedRecipeTitles.includes(chosenRecipe)) return;
  savedRecipeTitles.push(chosenRecipe);
  localStorage.setItem("movie", JSON.stringify(savedRecipeTitles));
  var newFavRecipe = document.createElement("button");
  newFavRecipe.classList.add("favouritesBtn");
  newFavRecipe.textContent = chosenRecipe;
  favRecipes.appendChild(newFavRecipe);
}

// function cityButton() {
//     storedCity = localStorage.getItem("city");
//     if (storedCity) {
//       storedCity = JSON.parse(storedCity);
//       for (let index = 0; index < storedCity.length; index++) {
//         console.log(storedCity[index]);
//         var btn = document.createElement("button");
//         btn.classList.add("cityBtn");
//         btn.innerHTML = storedCity[index];
//         cityArray.appendChild(btn);
//       }
//     }
//   }
//   cityButton();
