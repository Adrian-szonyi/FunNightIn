// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");
var foodPoster = document.querySelector("#food-poster");
var foodTitle = document.querySelector("#recipe-heading");
var ingredientEl = document.querySelector("#ingredients");
var methodText = document.querySelector("#method");
var selectDiet = document.querySelector("#diet");
var selectDietOption = selectDiet.value;

generateBtn.addEventListener("click", getRandomMeal);

function getRandomMeal() {
  var selectDietOption = selectDiet.value;
  

  if (selectDietOption === "Vegetarian") {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var randomNumber = Math.floor(Math.random() * 33);
        var idNumber = data.meals[randomNumber].idMeal;
        const meal = data.meals[0];

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNumber}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const meal = data.meals[0];
        foodPoster.src = data.meals[0].strMealThumb;
        foodTitle.innerText = data.meals[0].strMeal;
        methodText.innerText = data.meals[0].strInstructions;
        // ingredientEl.innerText = data.meals[0].strIngredient1;
        getIngredients(meal);
        
        // adds ingredients and measurements to 
        function getIngredients (meal) {
          const ingredients = [];
          console.log(ingredients);
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push(
                // `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
              )
            } else {
              break;
            }
          }

          ingredientEl.innerHTML = `${ingredients
            .map((ingredients) => `<li>${ingredients}</li>`)
            .join("")}`;
        }
    
      });
    
      });      
      
      console.log(selectDietOption);

  } else if (selectDietOption === "Vegan") {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var randomNumber = Math.floor(Math.random() * 4);
        var idNumber = data.meals[randomNumber].idMeal;
        const meal = data.meals[0];

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNumber}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const meal = data.meals[0];
        foodPoster.src = data.meals[0].strMealThumb;
        foodTitle.innerText = data.meals[0].strMeal;
        methodText.innerText = data.meals[0].strInstructions;
        // ingredientEl.innerText = data.meals[0].strIngredient1;
        getIngredients(meal);
        
        // adds ingredients and measurements to 
        function getIngredients (meal) {
          const ingredients = [];
          console.log(ingredients);
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push(
                // `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
              )
            } else {
              break;
            }
          }

          ingredientEl.innerHTML = `${ingredients
            .map((ingredients) => `<li>${ingredients}</li>`)
            .join("")}`;
        }
    
      });
    
      });

      console.log(selectDietOption);

  } else if (selectDietOption == "Dessert") {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var randomNumber = Math.floor(Math.random() * 65);
        var idNumber = data.meals[randomNumber].idMeal;
        const meal = data.meals[0];

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNumber}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const meal = data.meals[0];
        foodPoster.src = data.meals[0].strMealThumb;
        foodTitle.innerText = data.meals[0].strMeal;
        methodText.innerText = data.meals[0].strInstructions;
        // ingredientEl.innerText = data.meals[0].strIngredient1;
        getIngredients(meal);        
        // adds ingredients and measurements to 
        function getIngredients (meal) {
          const ingredients = [];
          console.log(ingredients);
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push(
                // `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
              )
            } else {
              break;
            }
          }

          ingredientEl.innerHTML = `${ingredients
            .map((ingredients) => `<li>${ingredients}</li>`)
            .join("")}`;
        }
    
      });
    
      });
            
      console.log(selectDietOption);

  } else {
  
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
        
        // adds ingredients and measurements to 
        function getIngredients (meal) {
          const ingredients = [];
          console.log(ingredients);
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push(
                // `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
              )
            } else {
              break;
            }
          }

          ingredientEl.innerHTML = `${ingredients
            .map((ingredients) => `<li>${ingredients}</li>`)
            .join("")}`;
        }
    
      });
    
      console.log(selectDietOption);

  }

}
