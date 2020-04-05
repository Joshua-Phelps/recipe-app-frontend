import React, { Component } from 'react'

class AddIngredientForm extends Component {

    render() {

        return (
            this.props.ingredients.map((val, idx)=> {
              let ingId = `ing-${val.id}`
              let amountId = `amountId-${val.id}`
              return (
                <div key={val.id}>
                  <label htmlFor={ingId}>{`Ingredient #${idx + 1}`}</label>
                  <input
                    type="text"
                    name={ingId}
                    data-id={idx}
                    id={ingId}
                    defaultValue={val.ing_name} 
                    className="ing_name"
                    />
                  <label htmlFor={amountId}>{`Amount`}</label>
                  <input
                    type="text"
                    name={amountId}
                    data-id={idx}
                    id={amountId}
                    defaultValue={val.amount} 
                    className="amount"
                  />
                  <button onClick={(e) => this.props.onDelete(e, val.id)}>Delete</button>
                  
                </div>
              )
            })
          )
        }
    }

export default AddIngredientForm     