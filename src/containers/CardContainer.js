import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'


class CardContainer extends Component {


    //// map over card and display them 

    renderCards = () => {
        return this.props.recipes.map(recipe => {
            return (
            <div>
                <RecipeCard recipe={recipe}  />
            </div>
            )
        })
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