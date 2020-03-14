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


export const api = {
    auth: {
        getCurrentUser,
        signUp,
        login
    },
    recipes: {
        allRecipes,
    }
}