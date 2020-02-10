import React, { Component } from 'react'

class Details extends Component {



    render() {

        let { recipe } = this.props.recipe
        let { ingredients } = this.props.recipe

        return (
            <div>
                {recipe.title}
                {ingredients[0].ing_name}
            </div>
        )
    }

}

export default Details
