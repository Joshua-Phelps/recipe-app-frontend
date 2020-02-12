import React, { Component } from 'react';
// import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import MainPage from './components/MainPage'
import MyPage from './components/MyPage'
import Details from './components/Details'
import NavBar from './components/NavBar'

import Login from './Login';
import LoginForm from './components/LoginForm';

class App extends Component  {

  state = {
    allRecipes: [],
    myRecipes: { owned_recipes: [], favorite_recipes: [] },
    user: null,
    selectedRecipe: false,
    filtered: [],
    search: ''
  }

  componentDidMount() {
    this.fetchRecipes()
    if (JSON.parse(localStorage.getItem('user')).id){
      this.fetchMyRecipes(JSON.parse(localStorage.getItem('user')).id)
    }
  }

  fetchRecipes = () => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => this.setState({ allRecipes: data }))
  }

  fetchMyRecipes = id => {
    return fetch(`http://localhost:3000/users/${id}`)
    .then(res => res.json())

    .then(data => this.setState({myRecipes: { owned_recipes: data.owned_recipes, favorite_recipes: data.favorite_recipes}}))
  }

  handleCategorySelect = () => {
    console.log("Category Selected")
  }

  showDetails = recipe => {
    this.setState({ selectedRecipe: recipe })
  }

  makeNewRecipe = recipeInfo => {
    fetch(`http://localhost:3000/recipes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(recipeInfo)
    }).then(res => res.json())
      .then(data => this.setState(prevState => ({
        allRecipes: [...prevState.allRecipes, data],
        myRecipes: {
          favorite_recipes: prevState.myRecipes.favorite_recipes,
          owned_recipes: [...prevState.myRecipes.owned_recipes, data]
        }
      })))
    // .then(data => console.log(data))
  }


  updateSearch = e => {
    this.setState({ search: e.target.value })
  }

  addToFavorites = (recipeId, userId) => {
    console.log(recipeId, userId)
    fetch(`http://localhost:3000/user_recipes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: userId
      })
    }).then(res => res.json())
      .then(data => {
        if (!data.error) {
          this.setState(prevState => ({
            myRecipes: {
              favorite_recipes: [...prevState.myRecipes.favorite_recipes, data],
              owned_recipes: prevState.myRecipes.owned_recipes
            }
          }))
        } else {
          console.log(data)
        }
      })
      // .catch(err => {
      //   console.log(err)
      // })
  }

  login = (userInfo) => {
    console.log(userInfo)
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(json => localStorage.setItem('user', JSON.stringify(json)))
    .then(this.fetchMyRecipes(JSON.parse(localStorage.getItem('user')).id))
    // .then(this.fetchMyRecipes(localStorage.getItem(user['id'])))
  }

  
  render(){

    console.log("owned", this.state.myRecipes.owned_recipes)
    console.log("favorite", this.state.myRecipes.favorite_recipes)

    const allRecipes = this.state.allRecipes.filter(r => r.recipe.title.includes(this.state.search))
    const ownedRecipes = this.state.myRecipes.owned_recipes.filter(r => r.recipe.title.includes(this.state.search))
    const favoriteRecipes = this.state.myRecipes.favorite_recipes.filter(r => r.recipe.title.includes(this.state.search))

    return (
      <Router>
          {/* {console.log(this.state)} */}
          <NavBar recipes={this.state.allRecipes} search={this.state.search} onSearch={this.updateSearch}/> 
          <Route 
            path="/"
            exact
            render={() => <MainPage recipes={allRecipes} onShowDetails={this.showDetails} />}
          />

          <Route 
            path="/my-page"
            exact
            render={() => 
              <MyPage onMakeNewRecipe={this.makeNewRecipe} onShowDetails={this.showDetails} favoriteRecipes={favoriteRecipes} ownedRecipes={ownedRecipes} />
            }
            />

          <Route 
            path="/recipe-details/:id"
            exact
            render={(props) => <Details {...props} recipes={this.state.allRecipes} />
            }
          />
          <Route 
            path="/login"
            exact
            render={(props) => <LoginForm {...props} onLogin={this.login} />
            }
          />
          
      </Router>
            // {(this.state.selectedRecipe) ? (<Details recipe={this.state.selectedRecipe}/>
            // ) : (
            //   <MyPage onMakeNewRecipe={this.makeNewRecipe} onShowDetails={this.showDetails} favoriteRecipes={favoriteRecipes} ownedRecipes={ownedRecipes} /> 
              
            //   )} 
        
      // <div>
      //   {/* {console.log(this.state)} */}
      //   <NavBar recipes={this.state.allRecipes} search={this.state.search} onSearch={this.updateSearch} />
      //   {(this.state.selectedRecipe) ? (<Details recipe={this.state.selectedRecipe} onFavorites={this.addToFavorites} />
      //   ) : (
      //       <MyPage onMakeNewRecipe={this.makeNewRecipe} onShowDetails={this.showDetails} favoriteRecipes={favoriteRecipes} ownedRecipes={ownedRecipes} />
      //       // <MainPage recipes={allRecipes} onShowDetails={this.showDetails} />

      //     )}
      // </div>
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
