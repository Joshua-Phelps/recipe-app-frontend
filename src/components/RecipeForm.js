import React, { Component } from 'react'
import AddIngredientForm from './AddIngredientForm'
import { Button, Form, Dropdown } from 'semantic-ui-react'



class RecipeForm extends Component {

    constructor(){
        super()
        this.state = {
            title: '',
            image: '',
            area: '',
            category: '',
            directions: '',
            ingredients: [{ingName: "", amount: ""}]
        }
    }

    handleChange = (e) => {
        if (e.target.className === 'ingName' || e.target.className === 'amount'  ){
            let ingredients = [...this.state.ingredients]
            ingredients[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ ingredients }, () => console.log(this.state.ingredients))
        } else {
            this.setState({ [e.target.name]: e.target.value })
        } 
    }

    handleCategoryChange = (e, value) => {
        this.setState({ category: value.value })
    }

    addIngredientInput = (e) => {
        this.setState((prevState) => ({
          ingredients: [...prevState.ingredients, {ingName: "", amount: ""}],
        }));
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('hello')
        this.props.onMakeNewRecipe(this.state)
    }

    render() {
        const { title, image, area, category, directions, ingredients } = this.state
        const categories = [
            { key: 1, text: 'Vegetarian', value: 'Vegetarian' },
            { key: 2, text: 'Dessert', value: 'Dessert' },
            { key: 3, text: 'Beef', value: 'Beef' },
            { key: 4, text: 'Starter', value: 'Starter' },
            { key: 5, text: 'Breakfast', value: 'Breakfast' },
            { key: 6, text: 'Seafood', value: 'Seafood' },
            { key: 7, text: 'Miscellaneous', value: 'Miscellaneous' },
            { key: 8, text: 'Side', value: 'Side' },
            { key: 9, text: 'Chicken', value: 'Chicken' },
            { key: 10, text: 'Pasta', value: 'Pasta' },
            { key: 11, text: 'Pork', value: 'Pork' },
            { key: 12, text: 'Lamb', value: 'Lamb' },
            { key: 13, text: 'Goat', value: 'Goat' },
            { key: 14, text: 'Vegan', value: 'Vegan' },
        ]

        return (
          <Form onSubmit={e => this.handleSubmit(e)} onChange={this.handleChange}>
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
                <input type="text" name="area" value={area} placeholder='region' />
            </lable>

            {/* <lable style={{ paddingRight:"10px" }} >
                Category:
                <input type="text" name="category" value={category} placeholder='e.g. breakfast' />
            </lable> */}

            <lable style={{ paddingRight:"10px" }} >
                Category:{' '}
                <Dropdown name="category" value={this.state.category} onChange={this.handleCategoryChange} options={categories} placeholder='Choose Category' />
            </lable>

            </Form.Group>
            
            <lable style={{ paddingRight:"10px" }} >
                  Directions:
                  <textarea name="directions" value={directions} placeholder='Directions' />
            </lable>

            <Form.Group widths='equal'>
                <Button type='button' onClick={this.addIngredientInput}>Add Ingredient</Button>
                <AddIngredientForm ingredients={ingredients} />
            </Form.Group>

                <br></br>
            <Button type='submit'>Submit</Button>
            </Form>
        )
    }

}

export default RecipeForm
