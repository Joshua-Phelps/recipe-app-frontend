import React, { Component } from 'react'
import CardContainer from '../containers/CardContainer'
import { Menu, Segment } from 'semantic-ui-react'
import RecipeForm from './RecipeForm'

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

    setTab = (value) => {
        this.setState({activeItem: value})
    }

    render() {
        const { activeItem } = this.state
        const { recipes, favoriteRecipes, user, isFavorite } = this.props
        
      
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
                    {(this.state.activeItem === 'My Recipes') && 
                    <CardContainer 
                        onRemoveFromFavorites={this.props.onRemoveFromFavorites} 
                        onAddToFavorites={this.props.onAddToFavorites} 
                        userId={this.props.userId} 
                        isFavorite={isFavorite} 
                        onShowDetails={this.props.onShowDetails}  
                        recipes={recipes} /> 
                    }
                    {(this.state.activeItem === 'Favorite Recipes') && 
                    <CardContainer 
                        onRemoveFromFavorites={this.props.onRemoveFromFavorites} 
                        onAddToFavorites={this.props.onAddToFavorites} 
                        userId={this.props.userId} 
                        isFavorite={isFavorite} 
                        onShowDetails={this.props.onShowDetails} 
                        recipes={favoriteRecipes} />
                    }
                    {(this.state.activeItem === 'Add Recipes') ? <RecipeForm user={user} onSetTab={this.setTab} onMakeNewRecipe={this.props.onMakeNewRecipe} myProps={this.props.myProps} /> : null }

                </Segment>
            </div>
        )
    }
}

export default MyPage