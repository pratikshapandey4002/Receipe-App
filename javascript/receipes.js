const receipes_container = document.querySelector(".receipes-container");
document.addEventListener('DOMContentLoaded', async () => {
    try {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const area = urlParams.get('area');
    const category = urlParams.get('category');

    let apiURL = "";

    if(searchQuery){
        apiURL= `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    }
    else if(area){
        apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    }
    else{
        apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }
   
        
    
    if(apiURL){
        const data = await fetch(apiURL);
        const response = await data.json();

        const meals = response.meals;

        meals.forEach(meal =>{
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('category-card');
        mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>`

        const button = document.createElement('button');
        button.textContent = "View Receipes";
        mealDiv.appendChild(button);
        button.addEventListener('click' , () => {
            window.location.href = `receipeDetail.html?id=${meal.idMeal}`;
        });
        receipes_container.appendChild(mealDiv);
    });
    }
    else{
        receipes_container.textContent = "NO receipes Found!!"
    }
    } catch (error) {
        alert("Error Loading Receipes");
        
    }

});

