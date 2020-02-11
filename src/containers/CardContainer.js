import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'
<<<<<<< HEAD
import { Card, Grid, Container } from 'semantic-ui-react'
=======

import { Card, Container } from 'semantic-ui-react'


// import { Grid } from 'semantic-ui-react'
>>>>>>> e8122a6b8175234fc700e066a7615dc37b46b056


class CardContainer extends Component {


    //// map over card and display them 

    renderCards = () => {
        // console.log(this.props.recipes)
        if (this.props.recipes !== undefined){
            return this.props.recipes.map(recipe => {
                return (
                <div style={{ paddingRight:"10px", paddingTop:"10px" }}>
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
<<<<<<< HEAD
            <Card.Group style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} >
                    {this.renderCards()}
            </Card.Group>
=======
                    <Card.Group itemsPerRow={3}>
                            {this.renderCards()}
                    </Card.Group>
>>>>>>> e8122a6b8175234fc700e066a7615dc37b46b056
                </Container>

            </div>
        )
    }

}

export default CardContainer 