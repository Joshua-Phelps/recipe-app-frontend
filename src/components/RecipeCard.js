import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeCard extends Component {

handleShowDetails = () => {
    
}

    render() {
        let { recipe } = this.props.recipe
        let { ingredients } = this.props.recipe

        return (
            <div className="cards" >
                {this.props.recipe ? (
                    <Link to={`/recipe-details/${this.props.recipe.id}`} >
                        <Card raised image={this.props.recipe.img} header={this.props.recipe.title} />
                    </Link>
                ) : null }
                </div>
        )
    }
}

export default RecipeCard

{/* <div >
    <h2>{this.props.recipe.title}</h2>
    <img src={this.props.recipe.img} />
</div> */}