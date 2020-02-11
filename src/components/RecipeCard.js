import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class RecipeCard extends Component {

///displays recipe info 

// IF YOU ARE SIGNED IN 
// button to like 
//button to rate 

// Signed in and its your own recipe 
// button to edit/delete  

handleShowDetails = () => {
    this.props.onShowDetails(this.props.recipe)
}


    render() {
        let { recipe } = this.props.recipe
        let { ingredients } = this.props.recipe
        return (
            <div onClick={() => this.handleShowDetails()} padding-right= "10px">
                <Card raised image={recipe.img} header={recipe.title} />
            </div>
        )
    }
}

export default RecipeCard




{/* <div >
    <h2>{this.props.recipe.title}</h2>
    <img src={this.props.recipe.img} />
</div> */}

