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
var filterBtn = document.querySelector("filter-button");

generateBtn.addEventListener("click", getRandomMeal);

function getRandomMeal () {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}

