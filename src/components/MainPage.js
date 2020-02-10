import React, { Component } from 'react'

import CardContainer from '../containers/CardContainer'

class MainPage extends Component {



    render() {
        return (
            <div>
                <CardContainer recipes={this.props.recipes} />
            </div>
        )
    }

}

export default MainPage