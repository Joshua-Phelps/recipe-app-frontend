import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'


class CardContainer extends Component {


    //// map over card and display them 

    renderCards = () => {
        console.log(this.props.recipes)
        if (this.props.recipes !== undefined){
            return this.props.recipes.map(recipe => {
                return (
                <div>
                    <RecipeCard recipe={recipe.recipe} ingredients={recipe.ingredients}  />
                </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderCards()}
            </div>
        )
    }

}

export default CardContainer 