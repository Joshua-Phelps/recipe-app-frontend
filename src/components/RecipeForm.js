import React, { Component } from 'react'
import AddIngredientsEditForm from './AddIngredientsEditForm'
import { Button, Form, Dropdown } from 'semantic-ui-react'

class RecipeForm extends Component {

    constructor(){
        super()
        this.state = {
            title: '',
            img: '',
            area: '',
            category: '',
            directions: '',
            ingredients: [{ing_name: "", amount: ""}],
            rating: 0,
        }
    }

    handleChange = (e) => {
        if (e.target.className === 'ing_name' || e.target.className === 'amount'  ){
            let ingredients = [...this.state.ingredients]
            ingredients[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ ingredients })
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
        this.props.onMakeNewRecipe(this.state, this.props.user.id)
        // this.props.myProps.history.push('/')
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
          <Form style={{ padding: "10px" }} onSubmit={e => this.handleSubmit(e)} >
            <Form.Group widths='equal'>
            <label style={{ paddingRight:"10px" }} >
                Title:
                <input type="text" value={title} name="title" placeholder='Title' onChange={this.handleChange}/>
            </label>
            
            <label style={{ paddingRight:"10px" }}>
                Image:
                <input type="text" name="img" value={image} placeholder='Image' onChange={this.handleChange} />
            </label>

            <label style={{ paddingRight:"10px" }} >
                Region:
                <input type="text" name="area" value={area} placeholder='region' onChange={this.handleChange} />
            </label>

            <label style={{ paddingRight:"10px" }} >
                Category:{' '}
                <Dropdown name="category" value={category} onChange={this.handleCategoryChange} options={categories} placeholder='Choose Category' />
            </label>

            </Form.Group>
            
            <label style={{ paddingRight:"10px" }} >
                  Directions:
                  <textarea name="directions" value={directions} placeholder='Directions' onChange={this.handleChange} />
            </label>

            <Form.Group widths='equal'>
                <Button type='button' onClick={this.addIngredientInput}>Add Ingredient</Button>
                <AddIngredientsEditForm onChange={this.handleChange} ingredients={ingredients} />
            </Form.Group>

                <br></br>
            <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default RecipeForm