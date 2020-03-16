import React, { Component } from 'react'

class AddIngredientForm extends Component {

  render() {
      {console.log(this.props.ingredients)}
        return (
            this.props.ingredients.map((val, idx)=> {
              let ingId = `ing-${idx}`
              let amountId = `amountId-${idx}`
              return (
                <div key={idx}>
                  <label htmlFor={ingId}>{`Ingredient #${idx + 1}`}</label>
                  <input
                    type="text"
                    name={ingId}
                    data-id={idx}
                    id={ingId}
                    value={this.props.ingredients[idx].ing_name} 
                    className="ing_name"
                  />
                  <label htmlFor={amountId}>{`Amount`}</label>
                  <input
                    type="text"
                    name={amountId}
                    data-id={idx}
                    id={amountId}
                    // value={this.props.ingredients[idx].amount} 
                    value={'test'} 
                    className="amount"
                  />
                </div>
              )
            })
          )
        }
    }
    
export default AddIngredientForm