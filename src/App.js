import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage'
import MyPage from './components/MyPage'

class App extends Component  {

  state = {
    allRecipes: [],
    myRecipes: [],
    user: null 
  } 


  componentDidMount(){
    this.fetchRecipes()
  }

  fetchRecipes = () => {
    fetch('http://localhost:3000/recipes')
    .then(res => res.json())
    .then(data => this.setState({allRecipes: data}))
  }

  fetchMyRecipes = () => {
    fetch(`http://localhost:3000/recipes/${this.state.user.id}`)
    .then(res => res.json())
    .then(data => this.setState({allRecipes: data}))
  }
  



  
  render(){
    return (
          <div>
            {/* <NavBar />  */}
            <MyPage /> 
            <MainPage recipes={this.state.allRecipes} />
          </div>
        
    );
  }
}

export default App;


////// ***** these methods get recipes form database and post to our database ***********
          // fetchRecipes = () => {
          //   fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=y')
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