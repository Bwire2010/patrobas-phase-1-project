const mealEl_container = document.querySelector('.meal')
const fav_meals_container = document.querySelector ('.fav-meals')

getRandomMeal()
fetchFavMeals()

//fetching API from TheMealDB
async function getRandomMeal (){
    const resp = await fetch ('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData =await resp.json()
    const random_meal = respData.meals[0];
    console.log(random_meal)
    addMeal (random_meal)
}

async function getMealById (id){
    const resp = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const respData =await resp.json()
    const meal = respData.meals[0];
    
    return meal;
}

// async function getMealsBySearch(term){

// }

function addMeal (meal) {
    const meal_card = document.createElement('div');
    meal_card.classList.add('meal-card');
    meal_card.innerHTML = `
            <div class="meal-card-img-container">
                <img src="${meal.strMealThumb}">
             </div>
            <div class="meal-name">
                <p> ${meal.strMeal}</p>
                <i class="fa-regular fa-heart"></i>
            </div>
    `
    mealEl_container.appendChild(meal_card)

    const btn = meal_card.querySelector('.fa-heart');
    btn.addEventListener('click',() => {
        if (btn.classList.contains('fa-regular')){
            btn.setAttribute('class', 'fa-solid fa-heart')
            addMealLs(meal.idMeal)
        } else {
            btn.setAttribute('class','fa-regular fa-heart')
            removeMealLs(meal.idMeal)
        }
    })
}
//creating local storage for the meal list
function addMealLs (mealID) {
    const mealIds = getMealLs()
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealID]))
}

function removeMealLs(mealID){
    const mealIds = getMealLs()
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealID)))
}

function getMealLs () {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds
}

//fetching the  meals from the list

async function fetchFavMeals () {
    const mealsIds = getMealLs();
    const meals = [];
    for (let i = 0; i < mealsIds.length; i++){
        const mealID = mealsIds[i];
        meal = await getMealById(mealID)
        addMealToFav(meal)
        meals.push(meal)
    }

}
 //showwing them to the screen

function addMealToFav (meal) {
    const fav_meals = document.createElement('div');
    fav_meals.innerHTML = `
            <div class="single">
                <div class="top">
                    <div class="img-container">
                         <img src="${meal.strMealThumb}">
                    </div>
                    <div class="text">
                        <p>${meal.strMeal}</p>
                     </div>
                </div>
                <i class="fa-solid fa-x"></i>
            </div>
    `
    fav_meals_container.appendChild(fav_meals)
}