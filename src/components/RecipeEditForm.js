import React, { Component } from 'react'
import AddIngredientForm from './AddIngredientForm'
import { Button, Form, Dropdown } from 'semantic-ui-react'

class RecipeEditForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: null,
            title: '',
            img: '',
            area: '',
            category: '',
            directions: '',
            ingredients: [{ing_name: "", amount: ""}],
            rating: 0,
            loaded: false,
            set: false 
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
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter(ing => {
                if (ing.id !== id) return ing
                return null 
            })
        }))
    }

    handleChange = (e) => {
        e.persist()
        
        // this.handleIngredients()
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

    handleCategoryChange = (e, value) => {
        const category = value.value
        if (!this.state.loaded) {
            const {title, img, directions, id, area, ingredients, rating} = this.props.recipe
            const loaded = true 
            this.setState({title, img, directions, area, id, rating, category, loaded, ingredients})
        } else {
            this.setState({ category })    
        }
    }

    addIngredientInput = (e) => {
        if (this.state.loaded){
            this.setState((prevState) => ({
              ingredients: [...prevState.ingredients, {ingName: "", amount: ""}],
            }))
        } else {
            let {title, img, directions, id, area, ingredients, rating, category} = this.props.recipe
            const loaded = true 
            ingredients = [...ingredients, {ingName: "", amount: ""}]
            this.setState({title, img, directions, area, id, rating, category, loaded, ingredients})
        }
    }

    handleSubmit = e => {
        const id = this.props.match.params.id
        this.props.onEditRecipe(this.state)
        this.props.history.push(`/recipe-details/${id}`) 
    }

    setInitState = () => {
        if (!this.state.set){
            let {title, img, directions, id, area, ingredients, rating, category} = this.props.recipe
            let set = true 
            this.setState({title, img, directions, area, id, rating, category, ingredients, set})
        }
    }


    render() {
        const recipe = this.props.recipe
        const { title, img, area, category, directions, ingredients, loaded } = this.state
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
            {this.props.loaded ? (
                
          <Form style={{ padding: "10px" }} onSubmit={e => this.handleSubmit(e)} >
              {this.state.set ? null : this.setInitState()}
            <Form.Group widths='equal'>
            <label style={{ paddingRight:"10px" }} >
                Title:
                <input type="text" value={title} name="title" placeholder='Title' onChange={this.handleChange} />
            </label>
            
            <label style={{ paddingRight:"10px" }}>
                Image:
                <input type="text" name="img" value={img} placeholder='Image' onChange={this.handleChange} />
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

            <Form.Group onChange={this.handleChange} widths='equal'>
                <Button type='button' onClick={this.addIngredientInput}>Add Ingredient</Button>
                <AddIngredientForm onDelete={this.handleDeleteIngredient} ingredients={ingredients} />
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