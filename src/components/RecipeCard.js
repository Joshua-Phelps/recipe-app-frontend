import React, { Component } from 'react'
import { Card, Image, Grid } from 'semantic-ui-react'



class RecipeCard extends Component {

///displays recipe info 

// IF YOU ARE SIGNED IN 
// button to like 
//button to rate 

// Signed in and its your own recipe 
// button to edit/delete  

    render() {
        return (
            <div padding-right= "10px">
                <Card raised image={this.props.recipe.img} header={this.props.recipe.title} />
            </div>

        )
    }

}

export default RecipeCard




{/* <div >
    <h2>{this.props.recipe.title}</h2>
    <img src={this.props.recipe.img} />
</div> */}

