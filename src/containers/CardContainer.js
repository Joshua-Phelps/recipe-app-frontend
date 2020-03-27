import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'
import { Card, Container } from 'semantic-ui-react'

class CardContainer extends Component {

    //// map over card and display them 

    renderCards = () => {
        if (this.props.recipes !== undefined){
            return this.props.recipes.map(recipe => {
                
                return (
                <div key={recipe.id} style={{ height: '100%', paddingRight:"10px", paddingTop:"10px" }}>
                    <RecipeCard 
                    userId={this.props.userId} 
                    onRemoveFromFavorites={this.props.onRemoveFromFavorites} 
                    onAddToFavorites={this.props.onAddToFavorites} 
                    isFavorite={this.props.isFavorite}  
                    onShowDetails={this.props.onShowDetails} 
                    recipe={recipe} />
                </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Card.Group centered itemsPerRow={3}>
                            {this.renderCards()}
                    </Card.Group>
                </Container>

            </div>
        )
    }

}

export default CardContainer 