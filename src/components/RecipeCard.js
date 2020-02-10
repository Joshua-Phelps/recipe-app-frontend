import React, { Component } from 'react'


class RecipeCard extends Component {

///displays recipe info 

// IF YOU ARE SIGNED IN 
// button to like 
//button to rate 

// Signed in and its your own recipe 
// button to edit/delete  

    render() {
        return (
            <div >
                {this.props.recipe.title}
            </div>
        )
    }

}

export default RecipeCard