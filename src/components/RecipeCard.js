import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'

class RecipeCard extends Component {

///displays recipe info 

// IF YOU ARE SIGNED IN 
// button to like 
//button to rate 

// Signed in and its your own recipe 
// button to edit/delete  

showDetails = () => {
console.log(this.props.recipe)
let { recipe } = this.props;
return (

{/* <Item>
    <Item.Header>{recipe.title}</Item.Header>
    <Item.Image size='tiny' src={recipe.img} />
    <Item.Content>
        <Item.Meta>
            <span className='area'>{recipe.area}</span>
            <span className='category'>{recipe.category}</span>
            <span className='rating'>{recipe.rating}</span>
        </Item.Meta>
        <Item.Description>{recipe.description}</Item.Description>
    </Item.Content>
</Item> */}

)
}
    render() {
        return (
            <div onClick={() => this.showDetails()}>
                {this.props.recipe.title}
            </div>
        )
    }
}

export default RecipeCard