import React, { Component } from 'react'
import { api } from "../services/api";
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeCard extends Component {

    handleAddFavorite = () => {
        console.log(this.props.recipe.id, this.props.userId)
        api.recipes.addFavorite(this.props.recipe.id, this.props.userId)
        .then(data => this.props.onAddToFavorites(data.recipe_id))
    }

    handleRemoveFavorite = () => {
        api.recipes.removeFavorite(this.props.recipe.id, this.props.userId)
        .then(recipeId => this.props.onRemoveFromFavorites(recipeId))
    }

    render() {
        let { isFavorite, recipe } = this.props
        let { title, img, id } = this.props.recipe

        return (
            <div className="cards" >
                {this.props.recipe && 
                    <Card>
                        <Link to={`/recipe-details/${id}`} >
                        <Image raised style={{display: 'table-cell', height: '290px', width: '290px'}} src={img} wrapped />
                        </Link>
                        <Card.Content>
                            <Card.Header>{title}
                                <span style={{position:'absolute', right:'5px', bottom: '5px'}}>
                                    <Button as='div' labelPosition='right'>
                                    <Button onClick={ isFavorite(recipe) ? this.handleRemoveFavorite : this.handleAddFavorite} icon>
                                        {isFavorite(recipe) ? <Icon color='red' name='heart' /> : <Icon name='heart' />}
                                    </Button>
                                    </Button>
                                </span>
                            </Card.Header>
                        </Card.Content>
                    </Card>
                }
            </div>
        )
    }
}

export default RecipeCard

{/* <div >
    <h2>{this.props.recipe.title}</h2>
    <img src={this.props.recipe.img} />
</div> */}