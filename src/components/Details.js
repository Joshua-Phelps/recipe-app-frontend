import React, { Component } from 'react'
import { Item, Rating, Button } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { api } from '../services/api';

class Details extends Component {


    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.onSelectRecipe(id)
    }


    handleRating = (e, { rating }) => {
        console.log(rating)
        // const recipeId = this.props.match.params.id
        // this.props.onChangeRating(this.props.user.id, recipeId, rating)
    }

    listIngredients = () => {
        return this.getRecipes().ingredients.map(ingredient => {
            return <div className="item"><li>{ingredient.ing_name.charAt(0).toUpperCase() + ingredient.ing_name.slice(1)}</li></div>
        })
    }


    renderIngredients = () => {
        return this.props.recipe.indredients.map(ing => {
            return <div className="item"><li>{ing.ing_name.charAt(0).toUpperCase() + ing.ing_name.slice(1), ing.amount}</li></div>
        })
    }

    handleDelete = () => {
        const id = this.props.match.params.id
        this.props.deleteRecipe(id)
        this.props.history.push('/my-page')
    }

    handleAddFavorite = () => {
        console.log('adding')
        api.recipes.addFavorite(this.props.recipe.id, this.props.userId)
        .then(data => this.props.onAddToFavorites(data.recipe_id))
    }

    handleRemoveFavorite = () => {
        api.recipes.removeFavorite(this.props.recipe.id, this.props.userId)
        .then(recipeId => this.props.onRemoveFromFavorites(recipeId))
    }

    render() {
        const recipe = this.props.recipe 
        const { isOwned, isFavorite } = this.props 
        const token = localStorage.getItem("token")
        const id = this.props.match.params.id;
            return ( 
                <div>
                    {recipe ? (       
                        <Item.Group style={{ marginLeft: '2.8rem', padding: "20px" }}>
                        <Item>
                            <Item.Header as='h2'>{recipe.title}</Item.Header><br></br>
                        </Item>

                        <Item>
                            <Item.Image size='medium' src={recipe.img} />
                            <Item.Content>
                                <div className="ui bulleted list">
                                    <h3>Ingredients:</h3>
                                    {recipe.ingredients.map(ingredient => {
                                        return <div key={ingredient.id} className="item"><li>{ingredient.ing_name.charAt(0).toUpperCase() + ingredient.ing_name.slice(1)}, {ingredient.amount}</li></div>
                                        })}
                                </div>
                                {token && isOwned ? <Link to={`/edit-recipe/${id}`}><Button>Edit</Button></Link> : null }
                                {token && isOwned ? <Button onClick={this.handleDelete}>Delete</Button> : null }
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Content>
                                    {token ? ( 
                                        isFavorite ? <Button onClick={this.handleRemoveFavorite}>Remove from Favorites</Button> : <Button onClick={this.handleAddFavorite}>Add To Favorites</Button>
                                    ) : (
                                        <Button>Remove from Favorites</Button>
                                    )}
                                <Item.Meta>
                                    <span className='area' style={{ fontWeight: "bold" }}>Area: {recipe.area} </span>
                                </Item.Meta>
                                <Item.Meta>
                                    <span className='category' style={{ fontWeight: "bold" }}>Category: {recipe.category}</span>
                                </Item.Meta>
                                <Item.Meta >
                                    <Rating icon='star' onRate={this.handleRating} defaultRating={recipe.rating} maxRating={5} />
                                </Item.Meta><br></br>

                                <Item.Description>
                                    <div className="ui bulleted list">
                                        <h3>Directions:</h3> 
                                            {recipe.directions.split("\n").map((direction,key) => {
                                                return <div className="item"><li key={key}>{direction}</li></div>
                                            })}
                                    </div>
                                </Item.Description><br></br>
                            </Item.Content> <br></br>
                        </Item>
                    </Item.Group>
                ): (null) }
            </div>
         )
        
    }
}

export default Details


