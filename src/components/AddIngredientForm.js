import React, { Component } from 'react'

class AddIngredientForm extends Component {


    render() {

        return (
            this.props.ingredients.map((val, idx)=> {
              let ingId = `ing-${idx}`
              return (
                <div key={idx}>
                  <label htmlFor={ingId}>{`Ingredient #${idx + 1}`}</label>
                  <input
                    type="text"
                    name={ingId}
                    data-id={idx}
                    id={ingId}
                    value={this.props.ingredients[idx].ingName} 
                    className="ingName"
                  />
                </div>
              )
            })
          )

          
        }
    }
export default AddIngredientForm
        