const searchBtn = document.querySelector('.srch-btn');
const searchBox = document.querySelector('.srch-box');
const saved_receipes = document.querySelector('.saved-receipes');

saved_receipes.addEventListener('click' , () => {
    window.location.href = `html/favourites.html`;
})
searchBtn.addEventListener('click' , () => {

    const SearchQuery = searchBox.value.trim();
    if(!SearchQuery){
        alert("Enter the meal in the search box !");
    }
    else{
        window.location.href = `html/receipes.html?query=${SearchQuery}`;
    }
});

document.addEventListener("DOMContentLoaded" , async  () => {
    const sliderContainer = document.getElementById('slider-container');
    const categories_container = document.querySelector(".categories-container")
    try {
    const Adata = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const Aresponse = await Adata.json();

    const areas = Aresponse.meals;
    areas.forEach(area => {
        const card = document.createElement('div');
        card.classList.add("slider-card");
        card.textContent = area.strArea;

        card.addEventListener("click" , () => {
            window.location.href = `html/receipes.html?area=${area.strArea}`;
        });
        sliderContainer.appendChild(card);
        
    });

    const Cdata = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const Cresponse = await Cdata.json();

    const categories = Cresponse.categories;

    categories.forEach(category =>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category-card');
        categoryDiv.innerHTML = `
        <img src="${category.strCategoryThumb}">
        <h3>${category.strCategory}</h3>`

        const button = document.createElement('button');
        button.textContent = "View Receipes";
        categoryDiv.appendChild(button);
        button.addEventListener('click' , () => {
            window.location.href = `html/receipes.html?category=${category.strCategory}`;
        });
        categories_container.appendChild(categoryDiv);
    })
} catch (error) {
    alert("Error loading receipes");
        
}
    
});


const randomBtn = document.querySelector('.random-recipe-btn');
const popup = document.querySelector('.popup');
const receipe_details_content = document.querySelector(".receipe-details-content");
const receipe_close_btn = document.querySelector('.receipe-close-btn');
const loadingSpinner = document.querySelector('.loading-spinner');

randomBtn.addEventListener('click' , async () => {
    document.body.classList.add('disable-clicks');
    loadingSpinner.classList.remove('hidden');
    popup.classList.add('hidden');

    setTimeout(async () => {
    try{
        const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const response = await data.json();
        const randomMeal = response.meals[0];
        loadingSpinner.classList.add('hidden');
        popup.classList.remove('hidden');
        receipe_details_content.innerHTML = `
        <h3>${randomMeal.strMeal}</h3>
        <img src="${randomMeal.strMealThumb}">
        `
        const button = document.createElement('button');
        button.textContent = 'view Rceipe';
        receipe_details_content.appendChild(button);
        button.addEventListener('click' , () => {
            window.location.href = `html/receipedetail.html?query=${randomMeal.strMeal}`;
        });
    }catch(error){
        alert('Error fetching random receipe');
        loadingSpinner.classList.add('hidden'); 
        document.body.classList.remove('disable-clicks');
    }
}, 500);
});

receipe_close_btn.addEventListener('click' , () =>{
    popup.classList.add('hidden');
    document.body.classList.remove('disable-clicks');
})






