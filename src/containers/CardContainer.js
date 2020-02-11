import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'

import { Card, Container } from 'semantic-ui-react'


// import { Grid } from 'semantic-ui-react'


class CardContainer extends Component {


    //// map over card and display them 

    renderCards = () => {
        // console.log(this.props.recipes)
        if (this.props.recipes !== undefined){
            return this.props.recipes.map(recipe => {
                return (
                <div>
                    <RecipeCard onShowDetails={this.props.onShowDetails}  recipe={recipe} />
                </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Card.Group itemsPerRow={3}>
                            {this.renderCards()}
                    </Card.Group>
                </Container>

            </div>
        )
    }

}

export default CardContainer 