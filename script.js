const mealEl_container =document.querySelector('.meal')

getRandomMeal()
async function getRandomMeal (){
    const resp = await fetch ('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData =await resp.json()
    const random_meal = respData.meals[0];
    console.log(random_meal)
    addMeal (random_meal)
}

// async function getMealById (id){

// }

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
        }
    })
}


