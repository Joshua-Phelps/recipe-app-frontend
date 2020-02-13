import React, { Component } from 'react'
import { Item, Rating, Button } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

class Details extends Component {

    getRecipes = () => {
        const id = this.props.match.params.id;
        let foundRecipe = { 
            recipe: {
                title: "", img: "", area: "", category: "", rating: "", id: null, directions: ""
            },
                ingredients: []
        }
        const filteredRec =  this.props.recipes.filter(r => r.recipe.id === parseInt(id) )
        if (filteredRec) {

            return foundRecipe = filteredRec;
        } else {
            return foundRecipe;
        }
    }

    listIngredients = () => {
        return this.getRecipes().ingredients.map(ingredient => {
            return <div className="item"><li>{ingredient.ing_name.charAt(0).toUpperCase() + ingredient.ing_name.slice(1)}</li></div>
        })
    }

    renderInfo = (recipeObj, attr ) => {
        console.log(recipeObj[0])
        if (recipeObj[0]){
            return recipeObj[0].recipe[attr]
        }
    }

    renderIngredients = (recipeObj) => {
        console.log(recipeObj)
        if (recipeObj[0]){
            return recipeObj[0].ingredients.map(ing => {
                return (<div className="item"><li>{ing.ing_name.charAt(0).toUpperCase() + ing.ing_name.slice(1)}</li></div>)
            })
        }
    }

    handleDelete = () => {
        const id = this.renderInfo(this.getRecipes(), "id")
        this.props.deleteRecipe(id)
        this.props.history.push('/my-page')
    }

    render() {
        if (!this.renderInfo(this.getRecipes(), "title")){
            return this.getRecipes()
        } else {
            const title = this.renderInfo(this.getRecipes(), "title")
            const directions = this.renderInfo(this.getRecipes(), "directions")
            const img = this.renderInfo(this.getRecipes(), "img")
            const area = this.renderInfo(this.getRecipes(), "area")
            const category = this.renderInfo(this.getRecipes(), "category")
            const rating = this.renderInfo(this.getRecipes(), "rating")
            const id = this.renderInfo(this.getRecipes(), "id")
            return ( 
            <> 
            <Link to={`recipe-details/${id}`} />          
            <Item.Group>
                <Item>
                    <Item.Header as='h2'>{title}</Item.Header><br></br>
                </Item>

                <Item>
                    <Item.Image size='medium' src={img} />
                    <Item.Content>
                        <div className="ui bulleted list">
                            <h3>Ingredients:</h3>
                               
                                {this.renderIngredients(this.getRecipes())}
                        </div>
                        {JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id ? <Button><Link to={`/edit-recipe/${id}`}>Edit</Link></Button> : null }
                    {JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id ? <Button onClick={this.handleDelete}>Delete</Button> : null }

                    </Item.Content>
                </Item>

                <Item>
                    <Item.Content>
                        <Item.Meta>
                            <span className='area'>Area: {area}</span>
                        </Item.Meta>
                        <Item.Meta>
                            <span className='category'>Category: {category}</span>
                        </Item.Meta>


                        <Item.Meta >
                            <span className='rating'>Rating: </span>
                            <Rating icon='star' defaultRating={rating} maxRating={5} />
                        </Item.Meta><br></br>


                        <Item.Description>
                            <div className="ui bulleted list">
                                <h3>Directions:</h3> 
                                    {directions.split("\n").map((direction,key) => {
                                        return <div className="item"><li key={key}>{direction}</li></div>
                                    })}
                            </div>

                    </Item.Description><br></br>
                        <button className="fluid ui button" onClick={() => {this.props.onFavorites(id, JSON.parse(localStorage.getItem('user')).id)}}>Add to My Favorites</button>
                        </Item.Content> <br></br>
                        </Item>


                        {/* </Item.Description><br></br>
                            <button className="fluid ui button">Add to My Favorites</button>
                    </Item.Content> <br></br>
                </Item> */}
        </Item.Group>
        </> 
        )
        }
    }
}

export default Details
