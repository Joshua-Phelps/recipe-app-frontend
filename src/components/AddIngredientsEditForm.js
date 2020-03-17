import React, { Component } from 'react'

class AddIngredientForm extends Component {

  render() {
        return (
            this.props.ingredients.map((val, idx)=> {
              let ingId = `ing-${idx}`
              let amountId = `amountId-${idx}`
              return (            
                <div key={idx}>
                  <label style={{paddingRight: '10px'}} htmlFor={ingId}>{`Ingredient #${idx + 1}`}</label>
                  <input
                    type="text"
                    name={ingId}
                    data-id={idx}
                    id={ingId}
                    defaultValue={this.props.ingredients[idx].ing_name} 
                    className="ing_name"
                    onChange={this.props.onChange}
                  />
                  <label style={{paddingRight: '10px'}} htmlFor={amountId}>{`Amount`}</label>
                  <input
                    type="text"
                    name={amountId}
                    data-id={idx}
                    id={amountId}
                    defaultValue={this.props.ingredients[idx].amount} 
                    // value={'test'} 
                    className="amount"
                    onChange={this.props.onChange}
                  />
                </div>
              )
            })
          )
        }
    }
    
export default AddIngredientForm