import React, { Component } from 'react'

class AddIngredientForm extends Component {



    render() {

        return (
            <div style={{ width:"300px" }}>
            <lable >
            Ingredient:
            <input type="text" name="ingredient" placeholder='Ingredient' />
            </lable>
            </div>
        )
    }

}

export default AddIngredientForm