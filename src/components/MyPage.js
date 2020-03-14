import React, { Component } from 'react'
import CardContainer from '../containers/CardContainer'
import RecipeCard from './RecipeCard'
import { Input, Menu, Segment } from 'semantic-ui-react'
import RecipeForm from './RecipeForm'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class MyPage extends Component {

    constructor(){
        super()
        this.state = {
            activeItem: 'My Recipes'
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name})
    }    

    render() {
        const { activeItem } = this.state
        const { recipes, favorite_recipes } = this.props.user
        return (
            <div>
                <Menu attached='top' tabular>
                <Menu.Item
                    name='My Recipes'
                    active={activeItem === 'My Recipes'} 
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Favorite Recipes'
                    active={activeItem === 'Favorite Recipes'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Add Recipes'
                    active={activeItem === 'favorite'}
                    onClick={this.handleItemClick}
                />
                </Menu>

                <Segment attached='bottom'>
                    {(this.state.activeItem === 'My Recipes') ? <CardContainer onShowDetails={this.props.onShowDetails}  recipes={recipes} /> : null }
                    {(this.state.activeItem === 'Favorite Recipes') ? <CardContainer onShowDetails={this.props.onShowDetails} recipes={favorite_recipes} /> : null }
                    {(this.state.activeItem === 'Add Recipes') ? <RecipeForm user={this.props.user} onMakeNewRecipe={this.props.onMakeNewRecipe} myProps={this.props.myProps} /> : null }

                </Segment>
            </div>
        )
    }
}

export default MyPage