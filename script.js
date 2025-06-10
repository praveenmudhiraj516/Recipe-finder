// 🔹 STEP 1: Get required HTML elements
const searchBtn = document.getElementById('searchBtn');
const searchinput = document.getElementById("searchinput");
const resultContainer = document.getElementById("result-container");
const eachSpecificContainerEle = document.getElementById("eachSpecificContainer");
const interfaceEle = document.getElementById("interface");
const chickenBTnEle = document.getElementById("chickenBTn");
const pastaBTnEle = document.getElementById("pastaBTn");
const chocolateBTnEle = document.getElementById("chocolateBTn");
const beefBTnEle = document.getElementById("beefBTn");
const saladBTnEle = document.getElementById("saladBTn");
const soupBTnEle = document.getElementById("soupBTn");

// 🔹 STEP 2: Create and append recipe card (summary view)
function createAndAppend(idMeal, image, recipeName, cat, country, instructions, source) {
    const anchor = document.createElement("a");
    anchor.href = "#eachSpecificContainer";
    anchor.style.display = "block";
    anchor.style.textDecoration = "none";

    const card = document.createElement("div");
    card.classList.add("bg-[white]", "w-[35vw]", "m-[10px]", "rounded-xl", "text-center");
    card.style.backgroundColor = "#e0ffe0";
    card.style.cursor = "pointer";

    card.innerHTML = `
        <img src="${image}" class="h-[280px] w-100 rounded-lg" />
        <div style="margin-top:10px">
        <h1 class="font-bold text-[grey]">${recipeName}</h1>
        </div>
        <div style="margin-top:10px" >
        <span class="bg-[#f0a54a] text-[white] rounded-lg p-1">${cat}</span>
        <span class="bg-[#7ab0e6] text-[white] rounded-lg p-1">${country}</span>
        </div>
        <div style="text-align:center">
        <p>${instructions}</p>
        </div>
        <a href="${source}" class="text-[#d18f56] font-bold" target="_blank">Click for full Recipe</a>
    `;

    card.addEventListener("click", (event) => {
        event.preventDefault();
        eachspecific(idMeal);
        document.querySelector("#eachSpecificContainer")?.scrollIntoView({
            behavior: "smooth"
        });
    });

    anchor.appendChild(card);
    resultContainer.appendChild(anchor);
}

// 🔹 STEP 3: Show detailed recipe (on card click)
const eachspecific = async (idMeal) => {
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const response = await fetch(api);
    const data = await response.json();
    const eachItem = data.meals[0];
    eachSpecificContainerEle.innerHTML = "";

    const detailDiv = document.createElement("div");
    detailDiv.style.backgroundColor = "#f3f595";
    detailDiv.style.padding = "10px";
    detailDiv.classList.add("flex", "flex-column", "gap-4", "items-start");

    detailDiv.innerHTML = `
     <div style="margin-top: 10px;">
        <button onclick="showResults()" style="background-color:#4caf50; color:white; padding:5px 10px; border:none; border-radius:5px;">
            ← Back to Results
        </button>
    </div>
    <div style="display:flex; background-color:#e9f0ef;border-radius:15px;width:450px;padding:10px">
        <div>
            <img src="${eachItem.strMealThumb}" style="width:200px; border-radius:10px;" />
        </div>
        
        
        <div style="margin-left:16px; margin-top:15px">
            <h2 style="margin-bottom:10px; font-weight:bold; font-size:30px">${eachItem.strMeal}</h2>
            <span style="background-color:lightpink; padding:5px; border-radius:8px">${eachItem.strCategory}</span>
            
            <span style="background-color:lightblue; padding:5px; border-radius:8px">${eachItem.strArea}</span>
            <div style="margin-top:15px">
            <span><i class="fa-solid fa-clock"></i>prep & cook</span>
            <span><i class="fa-solid fa-person"></i>serves 4-6</span>
            </div>
            <div>
                <a href="${eachItem.strYoutube}" target="_blank">
                    <button style="background-color:red; color:white; border-radius:10px; margin-top:15px; border:0; padding:5px;border-color:red;">
                        Watch Video Tutorial
                    </button>
                </a>
            </div>
        </div>
    </div>
    `;
    eachSpecificContainerEle.appendChild(detailDiv);

    const flexDiv = document.createElement("div");
    flexDiv.classList.add("flex", "flex-row");
    eachSpecificContainerEle.appendChild(flexDiv);
    eachSpecificContainerEle.style.backgroundColor = "#f3f595";

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.style.padding = "10px";
    ingredientsDiv.classList.add("border-2", "m-4", "bg-white", "rounded-2xl", "h-[50%]");
    flexDiv.appendChild(ingredientsDiv);

    for (let i = 1; i <= 20; i++) {
        const ingredient = eachItem[`strIngredient${i}`];
        const measure = eachItem[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            const item = document.createElement("p");
            item.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <div style="margin-right:20px">${ingredient}</div>
                    <div style="color:brown; font-weight:bold">${measure}</div>
                </div>`;
            ingredientsDiv.appendChild(item);
        }
    }

    const instructionsDiv = document.createElement("div");
    instructionsDiv.style.backgroundColor = "#f8f8f8"; // Light grey background
    instructionsDiv.style.padding = "10px";
    instructionsDiv.innerHTML = `<p>${eachItem.strInstructions.replace(/(step\s*\d+[:.]?)/gi, "<br><br><strong>$1</strong>")}</p>`;
    instructionsDiv.style.width = "300px";
    instructionsDiv.classList.add("border-2", "m-4", "bg-white", "rounded-2xl");
    flexDiv.appendChild(instructionsDiv);

    const sourceDiv = document.createElement("div");
    sourceDiv.classList.add("text-center");
    sourceDiv.style.backgroundColor = "#f3f595";
    sourceDiv.style.padding = "10px";
    sourceDiv.innerHTML = `
        <a style="color:gold;font-weight:bold" href="${eachItem.strSource}" target="_blank">View Original Recipe Source</a>
    `;
    eachSpecificContainerEle.appendChild(sourceDiv);
};

// 🔹 STEP 4: Show Results Again
function showResults() {
    eachSpecificContainerEle.innerHTML = "";
    searchinput.value = "";
    eachSpecificContainerEle.style.backgroundColor = "";
    resultContainer.scrollIntoView({
        behavior: "smooth"
    });
}

// 🔹 STEP 5: Search button click → fetch recipes
function fetchingData(inputValue) {
    if (!inputValue || inputValue.trim() === "") {
        resultContainer.innerHTML = "<p>Please enter a valid search term.</p>";
        return;
    }

    resultContainer.classList.add("d-flex", "justify-content-center");
    resultContainer.innerHTML = `
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>`;
    interfaceEle.classList.add("hidden");

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            resultContainer.innerHTML = "";
            const meals = data.meals;
            resultContainer.innerHTML = `
                <div id="backButton">
                <a href="#mainContainer">
                <div style="margin-top: 10px;">
                    <button onclick="showHome()" style="background-color:#4caf50; color:white; padding:5px 10px; border:none; border-radius:5px;">
                        ← Back to Results
                    </button>
                </div> </a> </div>`;

            if (!meals) {
                resultContainer.innerHTML = "<p>No results found.</p>";
                return;
            }



            for (let meal of meals) {
                createAndAppend(
                    meal.idMeal,
                    meal.strMealThumb,
                    meal.strMeal,
                    meal.strCategory,
                    meal.strArea,
                    meal.strInstructions.slice(0, 150),
                    meal.strSource
                );
            }



        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            resultContainer.innerHTML = "<p>Something went wrong.</p>";
        });
    searchinput.value = "";

}


// 🔹 STEP 6: Search trigger
searchBtn.addEventListener("click", () => {
    const value = searchinput.value.trim();
    if (value === "") {
        alert("Please enter a search term.");
        return;
    }
    fetchingData(value);
});

// 🔹 STEP 7: Category button filters
chickenBTnEle.addEventListener("click", () => {
    fetchingData("chicken");
});
pastaBTnEle.addEventListener("click", () => {
    fetchingData("pasta");
});
chocolateBTnEle.addEventListener("click", () => {
    fetchingData("chocolate");
});
beefBTnEle.addEventListener("click", () => {
    fetchingData("beef");
});
saladBTnEle.addEventListener("click", () => {
    fetchingData("salad");
});
soupBTnEle.addEventListener("click", () => {
    fetchingData("soup");
});

function showHome() {
    // Reserved for future navigation logic if needed
    interfaceEle.classList.remove("hidden");
    resultContainer.textContent = "";
}