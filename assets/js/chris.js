// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");

var foodPoster = document.querySelector("#food-poster");
var foodTitle = document.querySelector("#recipe-heading");
var ingredientEl = document.querySelector("#ingredients");
var methodText = document.querySelector("#method");

generateBtn.addEventListener("click", getRandomMeal);

function getRandomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      foodPoster.src = data.meals[0].strMealThumb;
      foodTitle.innerText = data.meals[0].strMeal;
      methodText.innerText = data.meals[0].strInstructions;
    });
}
