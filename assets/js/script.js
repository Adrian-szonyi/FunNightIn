$(function () {
  $("#diet").selectmenu();

  $("#genre").selectmenu();

  $("#rating").selectmenu();
});

// Generate random movie and meal button
var generateBtn = document.querySelector("#generate-button");
// Generate with filters movie and meal button
var filterBtn = document.querySelector("#filter-button");
//Generated movie content
var movieTitle = document.querySelector("movie-title");
var overviewDiv = document.querySelector("overview");
//Generated recipe content
var recipeTitle = document.querySelector("recipe-title");
var ingredientEl = document.querySelector("ingredients");
var methodDiv = document.querySelector("method");
