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
  state = {
    auth: {
      user: {
        username: '',
        id: null,
        favoriteRecipes: [],
        ownedRecipes: []
      },
    },
    allRecipes: [],
    selectedRecipeId: false 
  }
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
        console.log(user)
        if (user.error) return alert(user.error)
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ 
          auth: updatedState,
         });
      })
    } 
    // this.fetchRecipes();
    // if (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id) {
    //     this.fetchMyRecipes(JSON.parse(localStorage.getItem("user")).id);
    // }
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: data.user }
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState(this.INITIAL_STATE)
  };
  // fetchRecipes = () => {
  //   fetch("http://localhost:3000/recipes")
  //     .then(res => res.json())
  //     .then(data => this.setState({ allRecipes: data, user: JSON.parse(localStorage.getItem("user")) }));
  // };

  selectRecipe = (id) => {
    this.setState({...this.state, selectedRecipeId: parseInt(id, 10)})
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

  changeRating = (rating, id) => {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({rating, id})
    }).then(res => res.json())
    .then(data => {
      this.setState(prevState => ({
        myRecipes: {
          owned_recipes: prevState.myRecipes.owned_recipes.map( r => {
            if (r.recipe.id === data.recipe.id){
              return data
            } else {
              return r 
            }
          }),
          favorite_recipes: [...prevState.myRecipes.favorite_recipes]
        }
      }))
    })
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

  makeNewRecipe = recipeInfo => {
    fetch(`http://localhost:3000/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(recipeInfo)
    })
      .then(res => res.json())
      .then(data =>
        this.setState(prevState => ({
          allRecipes: [...prevState.allRecipes, data],
          myRecipes: {
            favorite_recipes: prevState.myRecipes.favorite_recipes,
            owned_recipes: [...prevState.myRecipes.owned_recipes, data]
          }
        }))
      )
  };

  editRecipe = (recipeInfo, id) => {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(recipeInfo)
    }).then(res => res.json())
    .then(data => {
      this.setState(prevState => ({
        myRecipes: {
          owned_recipes: prevState.myRecipes.owned_recipes.map( r => {
            if (r.recipe.id === data.recipe.id){
              return data
            } else {
              return r 
            }
          }),
          favorite_recipes: [...prevState.myRecipes.favorite_recipes]
        }
      }))
    })
  };

  updateSearch = e => {
    const input = e.target.value;
    const upFirstLetter = input.charAt(0).toUpperCase() + input.slice(1);
    console.log("__CAPITALIZE__", upFirstLetter)
    this.setState({
      search: upFirstLetter
    })
    
  };

  deleteRecipe = (id) => {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'DELETE'
    })
      .then(() => this.setState(prevState => ({
        myRecipes: {
          favorite_recipes: [...prevState.myRecipes.favorite_recipes],
          owned_recipes: prevState.myRecipes.owned_recipes.filter(r => r.recipe.id !== id),
        },
        allRecipes: prevState.allRecipes.filter(r => r.recipe.id !== id)
      })))
  }

  addToFavorites = (recipeId, userId) => {
    console.log(recipeId, userId);
    fetch(`http://localhost:3000/user_recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          this.setState(prevState => ({
            myRecipes: {
              favorite_recipes: [...prevState.myRecipes.favorite_recipes, data],
              owned_recipes: prevState.myRecipes.owned_recipes
            }
          }))
          alert("Recipe is successfully added to your favorites!")
        } else if (data.destroyed) {
          this.setState(prevState => ({
            myRecipes: {
              owned_recipes: [...prevState.myRecipes.owned_recipes],
              favorite_recipes: prevState.myRecipes.favorite_recipes.filter(r => r.recipe.id !== data.id)
            }
          }))
          alert("Recipe is successfully removed from your favorites!")
        } else {
          alert("You can not add your own recipe to favorites!")
        }
      });
  };

  clearLoggedIn = () => {
    this.setState({loggedIn: false})
  }

  selectedRecipe = () => {
    if (this.state.selectedRecipeId) {
      return this.state.allRecipes.filter(r => r.id === this.state.selectedRecipeId)[0]
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
                  // favoriteRecipes={favoriteRecipes}
                  // ownedRecipes={ownedRecipes}
                  user={this.state.user}
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
              // recipes={allRecipes} 
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
                recipes={this.state.allRecipes}
                onFavorites={this.addToFavorites}
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
                recipes={this.state.myRecipes.owned_recipes}
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
