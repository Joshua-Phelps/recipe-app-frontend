import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'
import { Card, Grid } from 'semantic-ui-react'


// import { Grid } from 'semantic-ui-react'


class CardContainer extends Component {


    //// map over card and display them 

    renderCards = () => {
        console.log(this.props.recipes)
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
            <Card.Group style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} >
                    {this.renderCards()}
            </Card.Group>

            </div>
        )
    }

}

export default CardContainer 