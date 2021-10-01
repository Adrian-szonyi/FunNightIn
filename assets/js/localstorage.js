// When user clicks on generate button, once results are generated then an icon will appear to save results
// When user clicks on save icon, then it will be store into local storage and appear inthe favourites column
// When the user returns they will see their favourites in the thrid column
// User have the option of deleting all favourites or just one item.
// When the user clicks on a favourite, then the movie or meal will be retieved from the API and shown in the second column

var saveMovieBtn = document.querySelector("#save-movie");
var saveRecipeBtn = document.querySelector("#save-recipe");
var hideColumn2 = document.querySelector("#hidden");
var generateBtn = document.querySelector("#generate-button");

generateBtn.addEventListener("click", unhideColumn);

function unhideColumn(params) {
  setTimeout(function () {
    hideColumn2.classList.remove("hidden");
  }, 2000);
}
// saveMovieBtn.addEventListener("click", saveResult);
// saveRecipeBtn.addEventListener("click", saveResult);

// function saveResult (){

// }
