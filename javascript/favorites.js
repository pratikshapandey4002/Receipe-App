document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');

    // Get favorite recipes from localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Display each favorite recipe
    favorites.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h3>${recipe.strMeal}</h3>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <button onclick="viewRecipe('${recipe.idMeal}')">View Recipe</button>
        `;
        favoritesContainer.appendChild(recipeCard);
    });
});

// Function to redirect to the recipe details page
function viewRecipe(id) {
    window.location.href = `./html/receipedetail.html?id=${id}`; // Adjust according to your recipe details page URL
}
