//SLIDESHOW
///////////////////////

// Simulated database (image URLs)
const imageUrls = [  //replace images with database images dynamically
"./images/IMG_3621.JPG",
"./images/IMG_3657.JPG",
"./images/IMG_3938.JPG"
  // Add more image URLs as needed
];

// Function to create the slideshow
function createSlideshow() {
  const slideshowContainer = document.querySelector(".slideshow-container");

  // Loop through the image URLs and create slide elements
  imageUrls.forEach((imageUrl) => {   //repalce imageURL with database images
    const slide = document.createElement("img");
    slide.classList.add("slide");
    slide.src = imageUrl;    //from database
    
    slideshowContainer.appendChild(slide);
  });

  // Start the slideshow
  showSlide(0);
}

// Function to display a specific slide
function showSlide(slideIndex) {
  const slides = document.querySelectorAll(".slide");

  // Check if the slideIndex is within the range of slides
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  // Hide all slides
  slides.forEach(slide => (slide.style.display = "none"));

  // Display the current slide
  slides[slideIndex].style.display = "block";

  // Advance to the next slide after 3 seconds (adjust as needed)
  setTimeout(() => {
    showSlide(slideIndex + 1);
  }, 4000);
}

// Call the function to create and start the slideshow
createSlideshow();


/////////////////////////////////////
//Browse recipes - need to connect to sql dtabase
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const express = require('express');

const browseRecipes = document.getElementById(browseRecipes);
browseRecipes.addEventListener("click", searchRecipes);

function searchRecipes() {
    const searchQuery = document.getElementById("searchInput").value;

    //need to search sql database

    // Send an AJAX request to the PHP script
//     const xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         const searchResults = JSON.parse(this.responseText);
//         displayResults(searchResults);
//       }
//     };
//     xhttp.open("GET", `search_recipes.php?query=${searchQuery}`, true);
//     xhttp.send();
//   }

  // Function to display the search results
  function displayResults(results) {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";

//need to check the below save button so it would 

    if (results.length === 0) {
      searchResultsDiv.innerHTML = "<p>No recipes found.</p>";
    } else {
      results.forEach(recipe => {
        searchResultsDiv.innerHTML += `
          <div>
            <h2>${recipe.title}</h2>
            <button id="savedRecipe">Save Recipe</button> 
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>Ingredients</h3>
            <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
          </div>
        `;
      });
    }
  }}


  ///////////////////////////////////
  //save recipes in user profile
  const savedRecipe = document.getElementById("savedRecipe");
  savedRecipe.addEventListener("click", saveRecipe);

  function saveRecipe(recipeTitle) {
      // Get the existing saved recipes or initialize an empty array
      let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

      // Check if the recipe is not already saved before adding it
      if (!savedRecipes.includes(recipeTitle)) {
        savedRecipes.push(recipeTitle);

        // Save the updated array of recipes to localStorage
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        } else {
      alert("This recipe is already saved.");
    }
  }

  // Function to display saved recipes on the user profile
  function displaySavedRecipes() {
    const savedRecipesList = document.getElementById("savedRecipes");
    savedRecipesList.innerHTML = "";

    // Get the saved recipes from localStorage
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    // Display each saved recipe as a list item
    savedRecipes.forEach(recipeTitle => {
      const listItem = document.createElement("li");
      listItem.textContent = recipeTitle;
      savedRecipesList.appendChild(listItem);
    });
  }

  // Display saved recipes when the page loads
  displaySavedRecipes();

  ///////////////////////////////////
  //SUBMIT RECIPES
const submitRecipes = document.getElementById("submitRecipes")
submitRecipes.addEventListener("click", displayNewRecipe);
const recipeTitle = document.getElementById("recipeTitle").value;
const recipeIngredients = document.getElementById("recipeIngredients").value;
const recipeDirections = document.getElementById("recipeDirections").value;
 
//need to connect to sql so the recipe would be sent to database and then need to retrieve it from sql to display on landing page as new recipes and on user profile as submitted recipes.

  // Function to display the newly submitted recipe on the main page. Redo the function so it would pull newly submitted recipe from sql.
  function displayNewRecipe() {
    const recipesList = document.getElementById("recipesList");

    const recipeDiv = document.createElement("div");
    recipeDiv.innerHTML = `
      <h2>${recipeTitle}</h2>
      <p>Ingredients: ${recipeIngredients}</p>
      <p>Directions: ${recipeDirections}</p>
    `;

    recipesList.appendChild(recipeDiv);

    // Clear the form fields after submission
    recipeTitle.value = "";
    recipeIngredients.value = "";
    recipeDirections.value = "";
  }