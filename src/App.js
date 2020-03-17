import React, { Component } from "react";
import { api } from "./services/api";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import RecipeEditForm from './components/RecipeEditForm'
import Login from "./Login";
import LoginForm from "./components/LoginForm";
import RecipeForm from './components/RecipeForm'
import SignUp from './components/SignUp'

class App extends Component {

  BLANK_RECIPE = {
    id: null,
    title: '',
    img: '',
    directions: '',
    area: '',
    category: '',
    rating: '',
    ingredients: [{amount: '', ing_name: ''}]
  }

  INITIAL_STATE = {
    user: {
      username: '',
      id: null,
      favorite_recipes: [],
      recipes: []
    },
    allRecipes: [],
    selectedRecipeId: false 
  }
  
  state = this.INITIAL_STATE
  // state = {
  //   allRecipes: [],
  //   myRecipes: { owned_recipes: [], favorite_recipes: [] },
  //   loggedIn: false,
  //   selectedRecipe: false,
  //   user_id: null,
  //   search: "",
  //   category: "",
  //   area: "",
  //   user: { id: null, username: ''},
  //   updateEdit: 0, 
  // };

  componentDidMount() {
    api.recipes.allRecipes().then(recipes => this.setState({ ...this.state, allRecipes: recipes}))
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        if (user.error) return alert(user.error)
        this.setState({ 
          user: user,
         });
      })
    } 
  }



  login = user => {
    api.auth.login(user)
    .then(data => {
      localStorage.setItem("token", data.jwt);
      this.setState({...this.state, user: data.user})
    })
  };

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
  // fetchRecipes = () => {
  //   fetch("http://localhost:3000/recipes")
  //     .then(res => res.json())
  //     .then(data => this.setState({ allRecipes: data, user: JSON.parse(localStorage.getItem("user")) }));
  // };

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

  // changeRating = (rating, id) => {
  //   fetch(`http://localhost:3000/recipes/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({rating, id})
  //   }).then(res => res.json())
  //   .then(data => {
  //     this.setState(prevState => ({
  //       myRecipes: {
  //         owned_recipes: prevState.myRecipes.owned_recipes.map( r => {
  //           if (r.recipe.id === data.recipe.id){
  //             return data
  //           } else {
  //             return r 
  //           }
  //         }),
  //         favorite_recipes: [...prevState.myRecipes.favorite_recipes]
  //       }
  //     }))
  //   })
  // }

  changeRating = (userId, recipeId, rating) => {
    api.recipes.updateRating(userId, recipeId, rating)
    .then(data => console.log(data))
  }

  changeCategory = (category) => {
    if (category !== "All") {
      this.setState({ category: category })
    } else {
      this.setState({ category: "" })
    }
  }

  changeArea = (area) => {
    if (area !== "All") {
      this.setState({ area: area })
    } else {
      this.setState({ area: "" })
    }
  }

  showDetails = recipe => {
    this.setState({ selectedRecipe: recipe });
  };

  // makeNewRecipe = recipeInfo => {
  //   fetch(`http://localhost:3000/recipes`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(recipeInfo)
  //   })
  //     .then(res => res.json())
  //     .then(data =>
  //       this.setState(prevState => ({
  //         allRecipes: [...prevState.allRecipes, data],
  //         myRecipes: {
  //           favorite_recipes: prevState.myRecipes.favorite_recipes,
  //           owned_recipes: [...prevState.myRecipes.owned_recipes, data]
  //         }
  //       }))
  //     )
  // };

  makeNewRecipe = (recipe, userId) => {
    api.recipes.addRecipe(recipe, userId)
    .then(recipe => this.setState(prevState => ({
      allRecipes: [...prevState.allRecipes, recipe],
      user: {
        ...this.state.user,
        recipes: [...prevState.user.recipes, recipe.id]
      }
    })))
  }

  // editRecipe = (recipeInfo, id) => {
  //   fetch(`http://localhost:3000/recipes/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(recipeInfo)
  //   }).then(res => res.json())
  //   .then(data => {
  //     this.setState(prevState => ({
  //       myRecipes: {
  //         owned_recipes: prevState.myRecipes.owned_recipes.map( r => {
  //           if (r.recipe.id === data.recipe.id){
  //             return data
  //           } else {
  //             return r 
  //           }
  //         }),
  //         favorite_recipes: [...prevState.myRecipes.favorite_recipes]
  //       }
  //     }))
  //   })
  // };

  editRecipe = (recipe) => {
    api.recipes.editRecipe(recipe)
    .then(recipe => this.setState(prevState=> ({
      ...prevState,
      allRecipes: prevState.allRecipes.filter(r => {
        if (r.id !== recipe.id) return r
        return recipe 
      })
    }))) 
  }

  updateSearch = e => {
    const input = e.target.value;
    const upFirstLetter = input.charAt(0).toUpperCase() + input.slice(1);
    console.log("__CAPITALIZE__", upFirstLetter)
    this.setState({
      search: upFirstLetter
    })
    
  };

  // deleteRecipe = (id) => {
  //   fetch(`http://localhost:3000/recipes/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(() => this.setState(prevState => ({
  //       myRecipes: {
  //         favorite_recipes: [...prevState.myRecipes.favorite_recipes],
  //         owned_recipes: prevState.myRecipes.owned_recipes.filter(r => r.recipe.id !== id),
  //       },
  //       allRecipes: prevState.allRecipes.filter(r => r.recipe.id !== id)
  //     })))
  // }

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

  // addToFavorites = (recipeId, userId) => {
  //   console.log(recipeId, userId);
  //   fetch(`http://localhost:3000/user_recipes`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({
  //       recipe_id: recipeId,
  //       user_id: userId
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (!data.error) {
  //         this.setState(prevState => ({
  //           myRecipes: {
  //             favorite_recipes: [...prevState.myRecipes.favorite_recipes, data],
  //             owned_recipes: prevState.myRecipes.owned_recipes
  //           }
  //         }))
  //         alert("Recipe is successfully added to your favorites!")
  //       } else if (data.destroyed) {
  //         this.setState(prevState => ({
  //           myRecipes: {
  //             owned_recipes: [...prevState.myRecipes.owned_recipes],
  //             favorite_recipes: prevState.myRecipes.favorite_recipes.filter(r => r.recipe.id !== data.id)
  //           }
  //         }))
  //         alert("Recipe is successfully removed from your favorites!")
  //       } else {
  //         alert("You can not add your own recipe to favorites!")
  //       }
  //     });
  // };

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

  ownedRecipes = () => this.state.allRecipes.filter(r => this.state.user.recipes.includes(r.id))

  favoriteRecipes = () => this.state.allRecipes.filter(r => this.state.user.favorite_recipes.includes(r.id))


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


  // login = userInfo => {
  //   console.log(userInfo);
  //   fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(userInfo)
  //   })
  //     .then(res => res.json())
  //     .then(json => localStorage.setItem("user", JSON.stringify(json)))
  //     // .then(json => {
  //     //   console.log(localStorage);
  //     //   return json;
  //     // })
  //     .then(() => {
  //       if(JSON.parse(localStorage.getItem("user")).id) {
  //         this.fetchMyRecipes(JSON.parse(localStorage.getItem("user")).id)
  //         this.setState({user: JSON.parse(localStorage.getItem("user"))})
  //       } else {
  //         alert ("Wrong info!")
  //       }
  //   })
  // };

  render() {
    const selectedRecipe = this.selectedRecipe()

    // const ownedRecipes = this.state.allRecipes.filter(r => this.state.user.recipes.includes(r.id))
    // const favoriteRecipes = this.state.allRecipes.filter(r => this.state.user.favorite_recipes.includes(r.id))
    
  
    // const allRecipes = this.state.allRecipes.filter(r => {
    //   return (r.recipe.title.includes(this.state.search) && r.recipe.category.includes(this.state.category) && r.recipe.area.includes(this.state.area))
    // });
    // const ownedRecipes = this.state.myRecipes.owned_recipes.filter(r => {
    //   return (r.recipe.title.includes(this.state.search) && r.recipe.category.includes(this.state.category) && r.recipe.area.includes(this.state.area))
    // });
    // const favoriteRecipes = this.state.myRecipes.favorite_recipes.filter(r => {
    //   return (r.recipe.title.includes(this.state.search) && r.recipe.category.includes(this.state.category) && r.recipe.area.includes(this.state.area))
    // });
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
                  onShowDetails={this.showDetails}
                  user={this.state.user}
                  recipes={this.ownedRecipes()}
                  favoriteRecipes={this.favoriteRecipes()}
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
              recipes={this.state.allRecipes} 
              onShowDetails={this.showDetails} />
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
                // recipes={this.state.myRecipes.owned_recipes}
                recipe={selectedRecipe}
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
