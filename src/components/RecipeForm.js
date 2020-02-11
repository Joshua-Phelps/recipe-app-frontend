import React, { Component } from 'react'
import AddIngredientForm from './AddIngredientForm'
import { Button, Form } from 'semantic-ui-react'



class RecipeForm extends Component {

    constructor(){
        super()
        this.state = {
            title: '',
            image: '',
            region: '',
            type: '',
            directions: '',
            ingredients: [{ingName: ''}]
        }
    }

    handleChange = (e) => {
        if (e.target.className === 'ingName' ){
            let ingredients = [...this.state.ingredients]
            ingredients[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ ingredients }, () => console.log(this.state.ingredients))
        } else {
                this.setState({ [e.target.name]: e.target.value })
        
        }
    }

    addIngredientInput = (e) => {
        this.setState((prevState) => ({
          ingredients: [...prevState.ingredients, {ingName: "" }],
        }));
    }

    render() {
        const { title, image, region, type, directions, ingredients } = this.state
        return (
          <Form onChange={this.handleChange}>
            <Form.Group widths='equal'>
            <lable style={{ paddingRight:"10px" }} >
                Title:
                <input type="text" value={title} name="title" placeholder='Title' />
            </lable>
            
            <lable style={{ paddingRight:"10px" }}>
                Image:
                <input type="text" name="image" value={image} placeholder='Image' />
            </lable>

            <lable style={{ paddingRight:"10px" }} >
                Region:
                <input type="text" name="region" value={region} placeholder='region' />
            </lable>

            <lable style={{ paddingRight:"10px" }} >
                Type:
                <input type="text" name="type" value={type} placeholder='e.g. breakfast' />
            </lable>

            </Form.Group>
            
            <lable style={{ paddingRight:"10px" }} >
                  Type:
                  <textarea name="directions" value={directions} placeholder='Directions' />
            </lable>

            <Form.Group widths='equal'>
                <button onClick={this.addIngredientInput}>Add Ingredient</button>
                <AddIngredientForm ingredients={ingredients} />
            </Form.Group>

                <br></br>
            <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        )
    }

}

export default RecipeForm
