const receipeImg = document.querySelector(".receipe-img");
const heading = document.querySelector('.heading');
const IngredienList = document.querySelector(".list");
const cookingInstruction = document.getElementById('instruc');
const category = document.querySelector('.category');
const area = document.querySelector('.Area');
const saveFavoriteButton = document.getElementById("save-receipe");


document.addEventListener('DOMContentLoaded', async () =>{
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id')

            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            const meal = data.meals[0]; 
    
            receipeImg.src = `${meal.strMealThumb}`;
            heading.textContent = meal.strMeal;
            category.textContent = `Category: ${meal.strCategory}`; // Corrected string interpolation
            area.textContent = `Area: ${meal.strArea}`; // Corrected string interpolation
            IngredienList.innerHTML = fetchIngredients(meal);  // Populate ingredients
            cookingInstruction.textContent = meal.strInstructions;
            
            saveFavoriteButton.addEventListener("click", () => {
                const recipe = {
                    idMeal: `${meal.idMeal}`,
                    strMeal: `${meal.strMeal}`, 
                    strMealThumb: `${meal.strMealThumb}`
                };
            
                saveFavoriteRecipe(recipe);
            });
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
});
    
    // Function to generate ingredients list
    const fetchIngredients = (meal) => {
        let ingredientsList = "<ul>";  // Initialize the list as an unordered list
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];  // Corrected template string syntax
            const measure = meal[`strMeasure${i}`];  // Corrected template string syntax
    
            // If ingredient exists, add it to the list
            if (ingredient && ingredient.trim()) {
                ingredientsList += `<li>${measure} ${ingredient}</li>`; // Corrected template string syntax
            } else {
                break;  // Stop if no more ingredients are found
            }
        }
        ingredientsList += "</ul>";  // Close the unordered list
        return ingredientsList;  // Return the final HTML string
    }
    
    // Function to save a recipe as a favorite

function saveFavoriteRecipe(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Check if the recipe is already in favorites
    const exists = favorites.some(fav => fav.idMeal === recipe.idMeal);
    if (!exists) {
        favorites.push(recipe); // Add the new recipe to favorites
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
        alert('Recipe added to favorites!');
    } else {
        alert('This recipe is already in your favorites!');
    }
}



