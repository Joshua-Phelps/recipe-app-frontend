import React, { Component } from 'react'
import AddIngredientForm from './AddIngredientForm'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { api } from '../services/api';

class RecipeEditForm extends Component {

    constructor(){
        super()
        this.state = {
            id: null,
            title: '',
            img: '',
            area: '',
            category: '',
            directions: '',
            ingredients: [{ing_name: "", amount: ""}],
            rating: 0,
            hasChanged: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.onSelectRecipe(id)
    }

    handleIngredients = (e) => {
        if (e.target.className === 'ing_name' || e.target.className === 'amount'  ){
            const id =  parseInt(e.target.dataset.id, 10)
            this.setState(prevState => ({
                ...prevState,
                ingredients: prevState.ingredients.map((ing, idx )=> {
                    if (idx === id){
                        ing[e.target.className] = e.target.value
                        return ing
                    }else {
                        return ing 
                    }
                })
             }))
        } else {
            this.setState({ [e.target.name]: e.target.value })
        } 
    }

    handleDeleteIngredient = (e, id) => {
        console.log(id)
        e.preventDefault()
        if (this.state.hasChanged){
            this.setState(prevState => ({
                ingredients: prevState.ingredients.filter(ing => {
                    if (ing.id !== id) return ing
                    return null 
                })
            }))
        } else {
            const hasChanged = true
            const {title, img, directions, category, id, area, ingredients, rating} = this.props.recipe
            this.setState({title, img, directions, category, area, id, rating, hasChanged,
                ingredients: ingredients.filter((ing) => {
                    if (ing.id !== id) return ing
                    return null 
                })
            })
        }
    }

    handleChange = (e) => {
        e.persist()
        if (!this.state.hasChanged){
            const {title, img, directions, category, id, area, ingredients, rating} = this.props.recipe
            const hasChanged = true
            if (e.target.className === 'ing_name' || e.target.className === 'amount' ){
                const selectedIdx =  parseInt(e.target.dataset.id, 10)
                this.setState({
                    title, img, directions, category, area, id, rating, hasChanged,
                    ingredients: ingredients.map((ing, idx )=> {
                        if (idx === selectedIdx){
                            ing[e.target.className] = e.target.value
                            return ing
                        } else {
                            return ing 
                        }
                    })
                })
            } else {
                this.setState({
                    title, img, directions, category, area, id, rating, hasChanged, ingredients
                })
                this.setState({ [e.target.name]: e.target.value })
            }
        } else {
            console.log('else')
            this.handleIngredients(e)
        }
    }

    handleCategoryChange = (e, value) => {
        const category = value.value
        if (!this.state.hasChanged) {
            const {title, img, directions, id, area, ingredients, rating} = this.props.recipe
            const hasChanged = true 
            this.setState({title, img, directions, area, id, rating, category, hasChanged, ingredients})
        } else {
            this.setState({ category })    
        }
    }

    addIngredientInput = (e) => {
        if (this.state.hasChanged){
            this.setState((prevState) => ({
              ingredients: [...prevState.ingredients, {ingName: "", amount: ""}],
            }))
        } else {
            let {title, img, directions, id, area, ingredients, rating, category} = this.props.recipe
            const hasChanged = true 
            ingredients = [...ingredients, {ingName: "", amount: ""}]
            this.setState({title, img, directions, area, id, rating, category, hasChanged, ingredients})
        }
    }

    handleSubmit = e => {
        if (this.state.hasChanged) {
            const id = this.props.match.params.id
            this.props.onEditRecipe(this.state)
            this.props.history.push(`/recipe-details/${id}`)
        } else {
            alert("You didn't change anything")
        }
    }

    render() {
        const recipe = this.props.recipe
        const { title, img, area, category, directions, ingredients } = this.state
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
            <div>
            {recipe ? (
          <Form style={{ padding: "10px" }} onSubmit={e => this.handleSubmit(e)} >
            <Form.Group widths='equal'>
            <label style={{ paddingRight:"10px" }} >
                Title:
                <input type="text" value={ !title ? recipe.title : title} name="title" placeholder='Title' onChange={this.handleChange} />
            </label>
            
            <label style={{ paddingRight:"10px" }}>
                Image:
                <input type="text" name="img" value={!img ? recipe.img : img} placeholder='Image' onChange={this.handleChange} />
            </label>

            <label style={{ paddingRight:"10px" }} >
                Region:
                <input type="text" name="area" value={!area ? recipe.area : area} placeholder='region' onChange={this.handleChange} />
            </label>

            <label style={{ paddingRight:"10px" }} >
                Category:{' '}
                <Dropdown name="category" value={!category ? recipe.category : category } onChange={this.handleCategoryChange} options={categories} placeholder='Choose Category' />
            </label>

            </Form.Group>
            
            <label style={{ paddingRight:"10px" }} >
                  Directions:
                  <textarea name="directions" value={!directions ? recipe.directions: directions} placeholder='Directions' onChange={this.handleChange} />
            </label>

            <Form.Group onChange={this.handleChange} widths='equal'>
                <Button type='button' onClick={this.addIngredientInput}>Add Ingredient</Button>
                <AddIngredientForm onDelete={this.handleDeleteIngredient} ingredients={this.state.hasChanged ? ingredients : recipe.ingredients} />
            </Form.Group>

                <br></br>
            <Button type='submit'>Submit</Button>
            </Form>
            ) : (null)}
            </div>
        )
    }
}

export default RecipeEditForm