import React, { Component } from 'react'
import CardContainer from '../containers/CardContainer'

class MainPage extends Component {

    render() {
        return (
            <div>
                <CardContainer 
                onRemoveFromFavorites={this.props.onRemoveFromFavorites} 
                onAddToFavorites={this.props.onAddToFavorites} 
                userId={this.props.userId} 
                isFavorite={this.props.isFavorite} 
                onShowDetails={this.props.onShowDetails} 
                recipes={this.props.recipes} /> 
            </div>
        )
    }
}

export default MainPage