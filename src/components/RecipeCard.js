import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
            
            <div className="cards" onClick={() => this.handleShowDetails()} >
                    <Link to={`/recipe-details/${recipe.id}`} >
                    <Card raised image={recipe.img} header={recipe.title} />
                    </Link>
                </div>

            
        )
    }
}

export default RecipeCard




{/* <div >
    <h2>{this.props.recipe.title}</h2>
    <img src={this.props.recipe.img} />
</div> */}

