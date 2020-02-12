import React, { Component } from 'react'
import { Item, Rating } from 'semantic-ui-react'

class Details extends Component {

    listIngredients = () => {
        return this.props.recipe.ingredients.map(ingredient => {
            return <div className="item"><li>{ingredient.ing_name.charAt(0).toUpperCase() + ingredient.ing_name.slice(1)}</li></div>
        })
    }

    render() {
        let { recipe } = this.props.recipe
        return (
        <Item.Group>
            <Item>
                <Item.Header as='h2'>{recipe.title}</Item.Header><br></br>
            </Item>

            <Item>
                <Item.Image size='medium' src={recipe.img} />
                <Item.Content>
                    <div className="ui bulleted list">
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
                        <div className="ui bulleted list">
                            <h3>Directions:</h3> 
                                {recipe.directions.split("\n").map((direction,key) => {
                                    return <div className="item"><li key={key}>{direction}</li></div>
                                })}
                        </div>
                    </Item.Description><br></br>
                        <button className="fluid ui button" onClick={() => {this.props.onFavorites(this.props.recipe.recipe.id, 3)}}>Add to My Favorites</button>
                </Item.Content> <br></br>
            </Item>

        </Item.Group>
        )
    }
}

export default Details
