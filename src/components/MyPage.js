import React, { Component } from 'react'
import CardContainer from '../containers/CardContainer'
import RecipeCard from './RecipeCard'
import { Input, Menu, Segment } from 'semantic-ui-react'

class MyPage extends Component {


    constructor(){
        super()
        this.state = {
            activeItem: 'My Recipes'
        }
    }

    handleItemClick = (e, { name }) => {
        // console.log(e)
        console.log(name)
        this.setState({ activeItem: name})
    }    

      
    render() {
        const { activeItem } = this.state

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
                    {(this.state.activeItem === 'My Recipes') ? <CardContainer onShowDetails={this.props.onShowDetails}  recipes={this.props.ownedRecipes} /> : null }
                    {(this.state.activeItem === 'Favorite Recipes') ? <CardContainer onShowDetails={this.props.onShowDetails} recipes={this.props.favoriteRecipes} /> : null }
                    {(this.state.activeItem === 'Add Recipes') ? 'Recipe Form' : null }
                </Segment>

            </div>
        )
    }
}

export default MyPage