const API_ROOT = `http://localhost:3000`

const token = () => localStorage.getItem("token")


const headers = () => {
    return {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: token()
    }
}

const allRecipes = () => {
    return fetch(`${API_ROOT}/recipes`)
    .then(res => res.json())
}

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: headers()
    }).then(res => res.json()) 
}

const signUp = (user) => {
    return fetch(`${API_ROOT}/users`,{
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(user)
    }).then(res => res.json())
}

const login = user => {
    return fetch(`${API_ROOT}/auth`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(user)
    }).then(res => res.json())
}

const addFavorite = (recipeId, userId) => {
    return fetch(`${API_ROOT}/user_recipes`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({recipe_id: recipeId, user_id: userId, favorite: true})
      }).then(res => res.json())
}

const removeFavorite = (recipeId, userId) => {
    return fetch(`${API_ROOT}/user_recipes/1`, {
        method: "DELETE",
        headers: headers(),
        body: JSON.stringify({recipe_id: recipeId, user_id: userId, favorite: true})
      }).then(res => res.json())
}

const editRecipe = (recipe) => {
    return fetch(`${API_ROOT}/recipes/${recipe.id}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(recipe)
      }).then(res => res.json())
}

const updateRating = (userId, recipeId, rating) => {
    return fetch(`${API_ROOT}/ratings/${recipeId}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({user_id: userId, recipeId: recipeId, rating: rating})
    }).then(res => res.json())
}

const addRecipe = (recipe, userId) => {
    console.log(userId)
    return fetch(`${API_ROOT}/recipes`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({recipe: recipe, user_id: userId})
    }).then(res => res.json())
}

const deleteRecipe = (recipeId) => {
    return fetch(`${API_ROOT}/recipes/${recipeId}`,{
        method: "DELETE",
        headers: headers()
    }).then(res => res.json())
}

export const api = {
    auth: {
        getCurrentUser,
        signUp,
        login
    },
    recipes: {
        allRecipes,
        addFavorite,
        removeFavorite,
        editRecipe,
        updateRating,
        addRecipe,
        deleteRecipe
    }
}