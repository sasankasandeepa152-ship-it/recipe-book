"use strict";

// Sample recipe data for the Recipe Book.
const recipes = [
    {
        id: 1,
        name: "Creamy Tomato Pasta",
        category: "Dinner",
        cookingTime: 25,
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
        description: "A comforting pasta dish with a rich tomato sauce.",
        ingredients: [
            "200 g pasta",
            "2 tomatoes",
            "2 cloves garlic",
            "2 tablespoons olive oil",
            "Salt and pepper"
        ],
        instructions: [
            "Cook the pasta according to the package instructions.",
            "Heat olive oil and cook the garlic.",
            "Add chopped tomatoes and seasonings.",
            "Mix the sauce with the cooked pasta and serve."
        ]
    },
    {
        id: 2,
        name: "Fresh Garden Salad",
        category: "Lunch",
        cookingTime: 15,
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "A fresh salad made with colourful vegetables.",
        ingredients: [
            "1 cucumber",
            "2 tomatoes",
            "1 carrot",
            "Lettuce",
            "Lemon juice"
        ],
        instructions: [
            "Wash all vegetables carefully.",
            "Chop the vegetables into small pieces.",
            "Place them in a bowl.",
            "Add lemon juice and mix before serving."
        ]
    },
    {
        id: 3,
        name: "Banana Pancakes",
        category: "Breakfast",
        cookingTime: 20,
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
        description: "Soft pancakes with the natural sweetness of bananas.",
        ingredients: [
            "1 ripe banana",
            "1 cup flour",
            "1 egg",
            "1/2 cup milk",
            "1 teaspoon baking powder"
        ],
        instructions: [
            "Mash the banana in a bowl.",
            "Mix in the egg, milk, flour and baking powder.",
            "Heat a lightly greased pan.",
            "Cook small portions on both sides until golden."
        ]
    },
    {
        id: 4,
        name: "Vegetable Fried Rice",
        category: "Dinner",
        cookingTime: 30,
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
        description: "A simple rice dish with vegetables and seasoning.",
        ingredients: [
            "2 cups cooked rice",
            "1 carrot",
            "1/2 cup peas",
            "2 eggs",
            "Soy sauce"
        ],
        instructions: [
            "Prepare and chop the vegetables.",
            "Cook the vegetables in a heated pan.",
            "Add the eggs and stir until cooked.",
            "Add the rice and soy sauce, then mix well."
        ]
    },
    {
        id: 5,
        name: "Berry Breakfast Bowl",
        category: "Breakfast",
        cookingTime: 10,
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800",
        description: "A colourful breakfast bowl with fruit and yoghurt.",
        ingredients: [
            "1 cup yoghurt",
            "1 banana",
            "1/2 cup berries",
            "2 tablespoons oats"
        ],
        instructions: [
            "Add yoghurt to a bowl.",
            "Slice the banana.",
            "Add the fruit and oats.",
            "Serve immediately."
        ]
    },
    {
        id: 6,
        name: "Homemade Vegetable Soup",
        category: "Lunch",
        cookingTime: 35,
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
        description: "A warm soup prepared with vegetables and herbs.",
        ingredients: [
            "1 carrot",
            "1 potato",
            "1 onion",
            "3 cups vegetable stock",
            "Salt and pepper"
        ],
        instructions: [
            "Wash and chop the vegetables.",
            "Place the vegetables and stock in a pot.",
            "Bring to a boil, then simmer until tender.",
            "Season and serve warm."
        ]
    }
];

// Find the recipe section in the HTML.
const recipesSection = document.querySelector("#recipes");

// Display recipe cards.
function displayRecipes() {
    const recipeCards = recipes.map((recipe) => {
        return `
            <article class="recipe-card">
                <img
                    class="recipe-image"
                    src="${recipe.image}"
                    alt="${recipe.name}"
                    loading="lazy"
                >

                <div class="recipe-content">
                    <p class="recipe-category">${recipe.category}</p>

                    <h3>${recipe.name}</h3>

                    <p>${recipe.description}</p>

                    <div class="recipe-meta">
                        <span>${recipe.cookingTime} min</span>
                        <span>${recipe.difficulty}</span>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    recipesSection.innerHTML = `
        <h2>Explore Recipes</h2>
        <p class="section-description">
            Discover simple ideas for your next meal.
        </p>

        <div class="recipe-grid">
            ${recipeCards}
        </div>
    `;
}

// Get the recipe search controls and display elements.
const searchInput = document.querySelector("#recipe-search");
const categoryFilter = document.querySelector("#category-filter");
const recipeGrid = document.querySelector("#recipe-grid");
const recipeCount = document.querySelector("#recipe-count");
const emptyMessage = document.querySelector("#empty-message");

// Display the supplied recipes as cards.
function displayRecipes(recipeList) {
    recipeGrid.innerHTML = recipeList.map((recipe) => `
        <article class="recipe-card">
            <img
                class="recipe-image"
                src="${recipe.image}"
                alt="${recipe.name}"
                loading="lazy"
            >

            <div class="recipe-content">
                <p class="recipe-category">${recipe.category}</p>
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>

                <div class="recipe-meta">
                    <span>${recipe.cookingTime} min</span>
                    <span>${recipe.difficulty}</span>
                </div>
            </div>
        </article>
    `).join("");

    recipeCount.textContent =
        `${recipeList.length} recipe${recipeList.length === 1 ? "" : "s"} found`;

    emptyMessage.hidden = recipeList.length !== 0;
}

// Filter recipes using the search text and selected category.
function filterRecipes() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesName = recipe.name
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            recipe.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    displayRecipes(filteredRecipes);
}

// Update the results when the user changes either control.
searchInput.addEventListener("input", filterRecipes);
categoryFilter.addEventListener("change", filterRecipes);

// Display all recipes when the page first loads.
filterRecipes();
