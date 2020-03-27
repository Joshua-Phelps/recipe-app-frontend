import React, { Component } from "react";
import { api } from "./services/api";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import RecipeEditForm from './components/RecipeEditForm'
import LoginForm from "./components/LoginForm";
import SignUp from './components/SignUp'
import Spinner from './components/Spinner'

class App extends Component {

  INITIAL_STATE = {
    user: {
      username: '',
      id: null,
      favorite_recipes: [],
      recipes: []
    },
    allRecipes: [],
    selectedRecipeId: false, 
    loaded: false,
    search: '',
    category: 'All Categories',
    area: 'All Areas'
  }
  
  state = this.INITIAL_STATE

  componentDidMount() {
    api.recipes.allRecipes().then(recipes => this.setState({ ...this.state, loaded: true, allRecipes: recipes}))
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        if (user.error) return localStorage.removeItem("token")
        this.setState({user})
      })
    } 
  }

  login = user => {
    api.auth.login(user)
    .then(data => {
      localStorage.setItem("token", data.jwt);
      console.log(data.user)
      this.setState({...this.state, user: data.user})
    })
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState(prevState => ({
      user: {
        username: '',
        id: null,
        favoriteRecipes: [],
        ownedRecipes: []
      },
      allRecipes: prevState.allRecipes,

    }))
  }

  selectRecipe = (id) => {
    this.setState({...this.state, selectedRecipeId: parseInt(id, 10)})
  }

  addToFavorites = (recipeId) => {
    this.setState(prevState => ({
      ...prevState, 
      user: { 
        ...prevState.user, 
        favorite_recipes: [...prevState.user.favorite_recipes, recipeId]
      }}))
  }

  removeFromFavorites = (id) => {
    console.log(id)
    const newFavorites = this.state.user.favorite_recipes.filter(recipeId => recipeId !== id)
    console.log(newFavorites)
    this.setState(prevState => ({
      ...prevState, 
      user: { 
        ...prevState.user, 
        favorite_recipes: newFavorites
      }}))
  }


  fetchMyRecipes = id => {
    return fetch(`http://localhost:3000/users/${id}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          myRecipes: {
            owned_recipes: data.owned_recipes,
            favorite_recipes: data.favorite_recipes
          }
        })
      );
  };

  updateEditComponent = () => {
    this.setState(prevState => (
      {updateEdit: prevState.updateEdit+1})
    )
  }

  changeRating = (userId, recipeId, rating) => {
    api.recipes.updateRating(userId, recipeId, rating)
    .then(data => console.log(data))
  }

  changeCategory = (category) => {
      this.setState({ category })
  }

  changeArea = (area) => {
      this.setState({ area })
  }

  makeNewRecipe = (recipe, userId) => {
    return api.recipes.addRecipe(recipe, userId)
    .then(recipe => this.setState(prevState => ({
      allRecipes: [...prevState.allRecipes, recipe],
      user: {
        ...this.state.user,
        recipes: [...prevState.user.recipes, recipe.id]
      }
    })))
  }

  editRecipe = (recipe) => {
    api.recipes.editRecipe(recipe)
    .then(newRecipe => this.setState(prevState=> ({
      allRecipes: prevState.allRecipes.map(r => {
        if (r.id !== newRecipe.id) return r
        return newRecipe 
      })
    }))) 
  }

  updateSearch = e => {
    this.setState({
      search: e.target.value
    })
    
  };

  deleteRecipe = (recipeId) => {
    const deletedId = parseInt(recipeId)
    api.recipes.deleteRecipe(recipeId)
    .then(() => this.setState(prevState => ({
      allRecipes: prevState.allRecipes.filter(r => r.id !== deletedId),
      user: {
        ...prevState.user,
        favorite_recipes: prevState.user.favorite_recipes.filter(id => id !== deletedId),
        recipes: prevState.user.recipes.filter(id => id !== deletedId)
      }
    })))
  }

  clearLoggedIn = () => {
    this.setState({loggedIn: false})
  }

  selectedRecipe = () => {
    if (this.state.selectedRecipeId) {
      const foundRecipe = this.state.allRecipes.filter(r => r.id === this.state.selectedRecipeId)[0]
      if (foundRecipe){
        return foundRecipe
      } else {
        return {
          title: '',
          id: '',
          img: '',
          directions: '',
          ingredients: [{ing_name: '', amount: ''}],
          rating: '',
          area: '',
          category: ''
        }
      }
    }
  }

  ownedRecipes = () => {
    const owned = this.state.allRecipes.filter(r => this.state.user.recipes.includes(r.id))
    return this.allFilters(owned)
  }

  filterBySearch = (recipes) => {
    return recipes.filter(r => r.title.toLowerCase().includes(this.state.search.toLowerCase()))
  }

  allFilters = (recipes) => {
    const bySearch = this.filterBySearch(recipes)
    const byCategory = this.filterByCategory(bySearch)
    const byArea = this.filterByArea(byCategory)
    return byArea
  } 

  favoriteRecipes = () => {
    const favs = this.state.allRecipes.filter(r => this.state.user.favorite_recipes.includes(r.id))
    return this.allFilters(favs)
  }

  filterByCategory = (recipes) => {
    if (this.state.category === 'All Categories') return recipes
    return recipes.filter(r => {
      if (r.category === '') return null
      return this.state.category.includes(r.category)
    })
  }

  filterByArea = (recipes) => {
    if (this.state.area === 'All Areas') return recipes
    return recipes.filter(r => {
      if (r.area === '') return null
      return this.state.area.includes(r.area)
    })
  }

  isOwned = () => {
    if (this.state.user.recipes){
      return this.state.user.recipes.includes(this.state.selectedRecipeId)
    }
  }

  isFavorite = () => {
    if (this.state.user.favorite_recipes){
      return this.state.user.favorite_recipes.includes(this.state.selectedRecipeId)
    }
  }

  isFavorite2 = (recipe) => {
    if(this.state.user.favorite_recipes){
      return this.state.user.favorite_recipes.includes(recipe.id)
    }
  }

  render() {
    const selectedRecipe = this.selectedRecipe()

    return (
      <Router>
          <NavBar
            recipes={this.state.allRecipes}
            search={this.state.search}
            onSearch={this.updateSearch}
            changeCategory={this.changeCategory}
            changeArea={this.changeArea}
            onClearLoggedIn={this.clearLoggedIn}
            user={this.state.user}
            category={this.state.category}
            area={this.state.area}
            onLogout={this.logout}
          />
        {this.state.loaded ? 
          <>
          <Switch>
            {localStorage.length !== 0 ? (
              <Route
                path="/my-page"
                exact
                render={props => (
                  <MyPage
                    {...props}
                    myProps={props}
                    onMakeNewRecipe={this.makeNewRecipe}
                    isFavorite={this.isFavorite2} 
                    user={this.state.user}
                    recipes={this.ownedRecipes()}
                    favoriteRecipes={this.favoriteRecipes()}
                    onAddToFavorites={this.addToFavorites}
                    onRemoveFromFavorites={this.removeFromFavorites}
                    userId={this.state.user.id}
                  />
                )}
              />
            ) : (
              <Route
                path="/login"
                exact
                render={props => (
                  <LoginForm
                    {...props}
                    fetchRecipes={this.fetchMyRecipes}
                    onLogin={this.login}
                    loggedIn={this.state.loggedIn}
                  />
                )}
              />
            )}

            <Route
              path="/"
              exact
              render={() => (
                <MainPage 
                recipes={this.allFilters(this.state.allRecipes)}
                isFavorite={this.isFavorite2} 
                onAddToFavorites={this.addToFavorites}
                onRemoveFromFavorites={this.removeFromFavorites}
                userId={this.state.user.id}
                />
              )}
            />

            <Route
              path="/recipe-details/:id"
              exact
              render={props => (
                <Details
                  {...props}            
                  isOwned={this.isOwned()}
                  userId={this.state.user.id}
                  isFavorite={this.isFavorite()}
                  onAddToFavorites={this.addToFavorites}
                  onRemoveFromFavorites={this.removeFromFavorites}
                  deleteRecipe={this.deleteRecipe}
                  onChangeRating={this.changeRating}
                  onSelectRecipe={this.selectRecipe}
                  recipe={this.selectedRecipe()}
                />
              )}
            />
            <Route
              path="/edit-recipe/:id"
              exact
              render={props => (
                <RecipeEditForm
                  {...props}
                  recipe={selectedRecipe}
                  loaded={this.state.loaded}
                  onSelectRecipe={this.selectRecipe}
                  onEditRecipe={this.editRecipe}
                  updateEditComponent={this.updateEditComponent}
                />
              )}
            />
            <Route
              path="/sign-up"
              exact
              render={(props) => (
                <SignUp {...props} />
              )}
            />
          </Switch>
        </> : <Spinner />}
      </Router>
    );
  }
}

export default App;

// ***** these methods get recipes form database and post to our database ***********
// fetchRecipes = () => {
//   fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=z')
//   .then(res => res.json())
//   .then(data => this.mapRecipes(data.meals))
// }

// mapRecipes = recipes => {
//   recipes.map(recipe => {
//     this.postRecipe(recipe)
//   })
// }

// postRecipe = recipe => {
//   fetch('http://localhost:3000/recipes', {
//     method: 'POST',
//     headers: {
//       "Content-Type" : 'application/json',
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       title: recipe.strMeal,
//       img: recipe.strMealThumb,
//       directions: recipe.strInstructions,
//       area: recipe.strArea,
//       category: recipe.strCategory,
//       ingredients: [
//         [recipe.strIngredient1, recipe.strMeasure1 ],
//         [recipe.strIngredient2, recipe.strMeasure2 ],
//         [recipe.strIngredient3, recipe.strMeasure3 ],
//         [recipe.strIngredient4, recipe.strMeasure4 ],
//         [recipe.strIngredient5, recipe.strMeasure5 ],
//         [recipe.strIngredient6, recipe.strMeasure6 ],
//         [recipe.strIngredient7, recipe.strMeasure7 ],
//         [recipe.strIngredient8, recipe.strMeasure8 ],
//         [recipe.strIngredient9, recipe.strMeasure9 ],
//         [recipe.strIngredient10, recipe.strMeasure10 ],
//         [recipe.strIngredient11, recipe.strMeasure11 ],
//         [recipe.strIngredient12, recipe.strMeasure12 ],
//         [recipe.strIngredient13, recipe.strMeasure13 ],
//         [recipe.strIngredient14, recipe.strMeasure14 ],
//         [recipe.strIngredient15, recipe.strMeasure15 ],
//         [recipe.strIngredient16, recipe.strMeasure16 ],
//         [recipe.strIngredient17, recipe.strMeasure17 ],
//         [recipe.strIngredient18, recipe.strMeasure18 ],
//         [recipe.strIngredient19, recipe.strMeasure19 ],
//         [recipe.strIngredient20, recipe.strMeasure20 ]
//       ],
//    })
//   })
// }

// // ////// ***** these methods get recipes form database and post to our database ***********
//           fetchRecipes = () => {
//             fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=y')
//             .then(res => res.json())
//             .then(data => this.mapRecipes(data.meals))
//           }

//           mapRecipes = recipes => {
//             recipes.map(recipe => {
//               this.postRecipe(recipe)
//             })
//           }

//           postRecipe = recipe => {
//             fetch('http://localhost:3000/recipes', {
//               method: 'POST',
//               headers: {
//                 "Content-Type" : 'application/json',
//                 Accept: "application/json"
//               },
//               body: JSON.stringify({
//                 title: recipe.strMeal,
//                 img: recipe.strMealThumb,
//                 directions: recipe.strInstructions,
//                 area: recipe.strArea,
//                 category: recipe.strCategory,
//                 ingredients: [
//                   [recipe.strIngredient1, recipe.strMeasure1 ],
//                   [recipe.strIngredient2, recipe.strMeasure2 ],
//                   [recipe.strIngredient3, recipe.strMeasure3 ],
//                   [recipe.strIngredient4, recipe.strMeasure4 ],
//                   [recipe.strIngredient5, recipe.strMeasure5 ],
//                   [recipe.strIngredient6, recipe.strMeasure6 ],
//                   [recipe.strIngredient7, recipe.strMeasure7 ],
//                   [recipe.strIngredient8, recipe.strMeasure8 ],
//                   [recipe.strIngredient9, recipe.strMeasure9 ],
//                   [recipe.strIngredient10, recipe.strMeasure10 ],
//                   [recipe.strIngredient11, recipe.strMeasure11 ],
//                   [recipe.strIngredient12, recipe.strMeasure12 ],
//                   [recipe.strIngredient13, recipe.strMeasure13 ],
//                   [recipe.strIngredient14, recipe.strMeasure14 ],
//                   [recipe.strIngredient15, recipe.strMeasure15 ],
//                   [recipe.strIngredient16, recipe.strMeasure16 ],
//                   [recipe.strIngredient17, recipe.strMeasure17 ],
//                   [recipe.strIngredient18, recipe.strMeasure18 ],
//                   [recipe.strIngredient19, recipe.strMeasure19 ],
//                   [recipe.strIngredient20, recipe.strMeasure20 ]
//                 ],
//              })
//             })
//           }
