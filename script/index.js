let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
window.addEventListener('load', function () {
    var loadingScreen = document.getElementById('loading-screen');
    // Hide loading screen and show content after a delay (for demonstration)
    setTimeout(function () {
        loadingScreen.style.display = 'none';
    }, 2000); // Change delay as needed
});
toggle.addEventListener("click", function () {

    if (sidnav.classList.contains("d-none")) {
        sidnav.classList.replace("d-none", "d-block");
        toggle.classList.replace("fa-bars", "fa-xmark");
    } else {

        sidnav.classList.replace("d-block", "d-none");
        toggle.classList.replace("fa-xmark", "fa-bars");
    }
}
);
function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)
    $(".links li").animate({
        top: 300
    }, 500)
}

async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}
function showSearchInputs() {
    rowData.innerHTML = `<div class="container w-75" id="searchContainer">
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div></div>`
    searchContainer.innerHTML = ""
}
function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}

function getCategories() {
    rowData.innerHTML = `<div class="container">
    <div class="row py-5 g-4 " id="rowData">
<div class="col-md-3">
        <div onclick="getCategoryMeals('Beef')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/beef.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Beef</h3>
                <p>Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1]</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Chicken')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/chicken.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Chicken</h3>
                <p>Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Dessert')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/dessert.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Dessert</h3>
                <p>Dessert is a course that concludes a meal. The course usually consists of sweet foods, such as confections dishes or</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Lamb')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/lamb.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Lamb</h3>
                <p>Lamb, hogget, and mutton are the meat of domestic sheep (species Ovis aries) at different ages.

A sheep in its first</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Miscellaneous')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/miscellaneous.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Miscellaneous</h3>
                <p>General foods that don't fit into another category</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Pasta')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/pasta.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Pasta</h3>
                <p>Pasta is a staple food of traditional Italian cuisine, with the first reference dating to 1154 in Sicily.

Also commonly used</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Pork')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/pork.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Pork</h3>
                <p>Pork is the culinary name for meat from a domestic pig (Sus scrofa domesticus). It is the most commonly consumed</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Seafood')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/seafood.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Seafood</h3>
                <p>Seafood is any form of sea life regarded as food by humans. Seafood prominently includes fish and shellfish. Shellfish include</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Side')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/side.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Side</h3>
                <p>A side dish, sometimes referred to as a side order, side item, or simply a side, is a food item</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Starter')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/starter.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Starter</h3>
                <p>An entrée in modern French table service and that of much of the English-speaking world (apart from the United States</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Vegan')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/vegan.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Vegan</h3>
                <p>Veganism is both the practice of abstaining from the use of animal products, particularly in diet, and an associated philosophy</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Vegetarian')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/vegetarian.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Vegetarian</h3>
                <p>Vegetarianism is the practice of abstaining from the consumption of meat (red meat, poultry, seafood, and the flesh of any</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Breakfast')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/breakfast.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Breakfast</h3>
                <p>Breakfast is the first meal of a day. The word in English refers to breaking the fasting period of the</p>
            </div>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getCategoryMeals('Goat')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="https://www.themealdb.com/images/category/goat.png" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>Goat</h3>
                <p>The domestic goat or simply goat (Capra aegagrus hircus) is a subspecies of C. aegagrus domesticated from the wild goat</p>
            </div>
        </div>
</div>
</div>
</div>

} `}
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}
function getArea() {
    rowData.innerHTML = `<div class="container">
<div class="row py-5 g-4 " id="rowData">
<div class="col-md-3">
    <div onclick="getAreaMeals('American')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>American</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('British')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>British</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Canadian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Canadian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Chinese')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Chinese</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Croatian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Croatian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Dutch')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Dutch</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Egyptian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Egyptian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Filipino')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Filipino</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('French')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>French</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Greek')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Greek</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Indian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Indian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Irish')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Irish</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Italian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Italian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Jamaican')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Jamaican</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Japanese')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Japanese</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Kenyan')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Kenyan</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Malaysian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Malaysian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Mexican')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Mexican</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Moroccan')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Moroccan</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Polish')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Polish</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Portuguese')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Portuguese</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Russian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Russian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Spanish')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Spanish</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Thai')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Thai</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Tunisian')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Tunisian</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Turkish')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Turkish</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Unknown')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Unknown</h3>
    </div>
</div>

<div class="col-md-3">
    <div onclick="getAreaMeals('Vietnamese')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>Vietnamese</h3>
    </div>
</div>
</div>
</div>

}`}
async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
function getIngredients() {
    rowData.innerHTML = `<div class="container">
    <div class="row py-5 g-4 " id="rowData">
<div class="col-md-3">
        <div onclick="getIngredientsMeals('Chicken')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Chicken</h3>
                <p>The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Salmon')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Salmon</h3>
                <p>Salmon is the common name for several species of ray-finned fish in the family Salmonidae. Other fish in the same</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Beef')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Beef</h3>
                <p>Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Pork')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Pork</h3>
                <p>Pork is the culinary name for the flesh of a domestic pig (Sus scrofa domesticus). It is the most commonly</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Avocado')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Avocado</h3>
                <p>The avocado, a tree with probable origin in South Central Mexico, is classified as a member of the flowering plant</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Apple Cider Vinegar')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Apple Cider Vinegar</h3>
                <p>Apple cider vinegar, or cider vinegar, is a vinegar made from fermented apple juice, and used in salad dressings, marinades,</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Asparagus')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Asparagus</h3>
                <p>Asparagus, or garden asparagus, folk name sparrow grass, scientific name Asparagus officinalis, is a perennial flowering plant species in the</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Aubergine')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Aubergine</h3>
                <p>Eggplant (US, Australia), aubergine (UK), or brinjal (South Asia and South Africa) is a plant species in the nightshade family</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Baby Plum Tomatoes')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Baby Plum Tomatoes</h3>
                <p>The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Bacon')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Bacon</h3>
                <p>Bacon is a type of salt-cured pork. Bacon is prepared from several different cuts of meat, typically from the pork</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Baking Powder')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Baking Powder</h3>
                <p>Baking powder is a dry chemical leavening agent, a mixture of a carbonate or bicarbonate and a weak acid. The</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Balsamic Vinegar')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Balsamic Vinegar</h3>
                <p>Balsamic vinegar (Italian: aceto balsamico), occasionally shortened to balsamic, is a very dark, concentrated, and intensely flavoured vinegar originating in</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Basil')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Basil</h3>
                <p>Basil, also called great basil, is a culinary herb of the family Lamiaceae (mints).

Basil is native to tropical regions from</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Basil Leaves')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Basil Leaves</h3>
                <p>Basil, also called great basil, is a culinary herb of the family Lamiaceae (mints).
</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Basmati Rice')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Basmati Rice</h3>
                <p>Basmati is a variety of long, slender-grained aromatic rice which is traditionally from the Indian subcontinent. As of 2018-19, India</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Bay Leaf')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Bay Leaf</h3>
                <p>The bay leaf is an aromatic leaf commonly used in cooking. It can be used whole, or as dried and</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Bay Leaves')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Bay Leaves</h3>
                <p>The bay leaf is an aromatic leaf commonly used in cooking. It can be used whole, or as dried and</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Beef Brisket')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Beef Brisket</h3>
                <p>Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Beef Fillet')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Beef Fillet</h3>
                <p>Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
        </div>
</div>

<div class="col-md-3">
        <div onclick="getIngredientsMeals('Beef Gravy')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>Beef Gravy</h3>
                <p>Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.</p>
        </div>
</div>
</div>
</div>
}`}
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}
function displayMealDetails(meal) {

    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}

