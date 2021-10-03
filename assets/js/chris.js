// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");

var foodPoster = document.querySelector("#food-poster");
var foodTitle = document.querySelector("#recipe-heading");
var ingredientEl = document.querySelector("#ingredients")
var methodText = document.querySelector("#method");

generateBtn.addEventListener("click", getRandomMeal);

function getRandomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      foodPoster.src = data.meals[0].strMealThumb;
      foodTitle.innerText = data.meals[0].strMeal;
      methodText.innerText = data.meals[0].strInstructions;
      // ingredientEl.innerText = data.meals[0].strIngredient1; 
      getIngredients(meal);
         
      function getIngredients (meal) {
        const ingredients = [];
        console.log(ingredients);
        for (let i = 1; i <=20; i++) {
          if (meal[`strIngredient${i}`]) {
            ingredients.push(
              `${meal[`strIngredient${i}`]}`
            )
          } else {
            break;
          }
        }

        ingredientEl.innerHTML = 
        `${ingredients.map((ingredients) => `<li>${ingredients}</li>`).join("")}`;
      }
  
    }); 


}