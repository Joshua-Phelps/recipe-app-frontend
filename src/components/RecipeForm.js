import React, { Component } from 'react'
import AddIngredientForm from './AddIngredientForm'
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
  } from 'semantic-ui-react'

  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]


class RecipeForm extends Component {

    constructor(){
        super()
        this.state = {
            ingredientInputs: ['input-0'],

        }
    }

    // handleChange = (e, { value }) => this.setState({ value })

    handleChange = (e) => {
        console.log(e.target.value)
        // this.setState({ 
             
        // })
    }    

    appendInput() {
        let newInput = `input-${this.state.ingredientInputs.length}`;
        this.setState(prevState => ({ ingredientInputs: prevState.ingredientInputs.concat([newInput]) }));
    }

    render() {
        const { value } = this.state
        return (
          <Form>
            <Form.Group widths='equal'>
              <lable style={{ paddingRight:"10px" }} >
                  title:
                  <input type="text" name="title" placeholder='Title' />
              </lable>
              
              <lable style={{ paddingRight:"10px" }}>
                  Image:
                  <input type="text" name="image" placeholder='Image' />
              </lable>

              <lable style={{ paddingRight:"10px" }} >
                  Region:
                  <input type="text" name="region" placeholder='region' />
              </lable>

              <lable style={{ paddingRight:"10px" }} >
                  Type:
                  <input type="text" name="image" placeholder='e.g. breakfast' />
              </lable>
            </Form.Group>
            <Form>
                <div id="dynamicInput">
                    {this.state.ingredientInputs.map(input => <AddIngredientForm key={input} />)}
                </div>
            </Form>
                <button onClick={ () => this.appendInput() }>
                    Add Ingredient 
                </button>
            <Form.Field
              control={TextArea}
              label='Directions'
              placeholder='Directions'
            />
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        )
      }

}

export default RecipeForm