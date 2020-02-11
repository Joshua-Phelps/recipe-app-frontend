import React, { Component } from 'react'
import { Item, Rating } from 'semantic-ui-react'

class Details extends Component {

    listIngredients = () => {
        return this.props.recipe.ingredients.map(ingredient => {
            return <div class="item"><li>{ingredient.ing_name}</li></div>
        })
    }

    render() {
        let { recipe } = this.props.recipe
        let { ingredients } = this.props.recipe

        return (
        <Item.Group>
            <Item>
                <Item.Header as='h2'>{recipe.title}</Item.Header><br></br>
            </Item>

            <Item>
                <Item.Image size='medium' src={recipe.img} />
                <Item.Content>
                    <div class="ui bulleted list">
                        <h3>Ingredients:</h3>
                        
                            {this.listIngredients()}

                    </div>
                </Item.Content>
            </Item>

            <Item>
                <Item.Content>
                    <Item.Meta>
                        <span className='area'>Area: {recipe.area}</span>
                    </Item.Meta>
                    <Item.Meta>
                        <span className='category'>Category: {recipe.category}</span>
                    </Item.Meta>
                    <Item.Meta>
                        <span className='rating'>Rating: </span>
                        <Rating icon='star' defaultRating={recipe.rating} maxRating={5} />
                    </Item.Meta><br></br>
                    <Item.Description>
                        <h3>Directions:</h3> 
                            {recipe.directions}
                    </Item.Description><br></br>
                        <button class="fluid ui button">Add to My Favorites</button>
                </Item.Content> <br></br>
            </Item>

        </Item.Group>
        )
    }
}

export default Details
