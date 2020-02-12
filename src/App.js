import React, { Component } from 'react';
// import logo from './logo.svg';
// import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import MainPage from './components/MainPage'
import MyPage from './components/MyPage'
import Details from './components/Details'
import NavBar from './components/NavBar'

import Login from './Login';

class App extends Component  {

  state = {
    allRecipes: [],
    myRecipes: { owned_recipes: [], favorite_recipes: []},
    user: null, 
    selectedRecipe: false,
    filtered: [],
    search: '' 
  } 


  componentDidMount(){
    this.fetchRecipes()
    this.fetchMyRecipes()
  }

  fetchRecipes = () => {
    fetch('http://localhost:3000/recipes')
    .then(res => res.json())
    .then(data => this.setState({allRecipes: data}))
  }

  fetchMyRecipes = () => {
    return fetch(`http://localhost:3000/users/1`)
    .then(res => res.json())
    .then(data => this.setState({myRecipes: data }))
  }

  // removeBots = (selectedBot) => {
  //   this.setState({
  //     myBots: this.state.myBots.filter(item => item !== selectedBot)
  //   })
  // }

  // if (this.state.filtered) {
  //   return this.state.hogs.filter(hog => hog.greased)
  // } else {
  //   return this.state.hogs
  // }

  handleCategorySelect = () => {
    console.log("Category Selected")
  }

  showDetails = recipe => {
    this.setState({selectedRecipe: recipe})
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
    this.setState({ search: e.target.value})
  }

  
  render(){

    console.log("here", this.state.myRecipes.owned_recipes)

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
          
      </Router>
            // {(this.state.selectedRecipe) ? (<Details recipe={this.state.selectedRecipe}/>
            // ) : (
            //   <MyPage onMakeNewRecipe={this.makeNewRecipe} onShowDetails={this.showDetails} favoriteRecipes={favoriteRecipes} ownedRecipes={ownedRecipes} /> 
              
            //   )} 
        
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
