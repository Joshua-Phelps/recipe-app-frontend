import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'

import { Card, Grid } from 'semantic-ui-react'


// import { Grid } from 'semantic-ui-react'


class CardContainer extends Component {


    //// map over card and display them 

    renderCards = () => {
<<<<<<< HEAD
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
=======
        return this.props.recipes.map(recipe => {
            return (
            <div>

                 <RecipeCard recipe={recipe}  />
            
            </div>
            )
        })
>>>>>>> cea38babd42a5415dbc81a24c9da5aea7d1c9834
    }

    render() {
        return (
            <div>
            <Card.Group itemsPerRow={3}>
                    {this.renderCards()}
            </Card.Group>

            </div>
        )
    }

}

export default CardContainer 