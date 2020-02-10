import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'



class RecipeCard extends Component {

///displays recipe info 

// IF YOU ARE SIGNED IN 
// button to like 
//button to rate 

// Signed in and its your own recipe 
// button to edit/delete  

    render() {
        return (
            
            <Card.Group itemsPerRow={4}>
                {/* <Card.Content>
                <Image src={this.props.recipe.img} wrapped ui={false} />
                     <Card.Header>{this.props.recipe.title}</Card.Header>
                </Card.Content>    */}
                <Card color='white' image={this.props.recipe.img} />
            </Card.Group>


            // <div class="ui four cards">
            //     <div class="card">
            //         <div className="recipe-title" > <h2>{this.props.recipe.title}</h2></div>
            //         <div class="image"> <img src={this.props.recipe.img} /></div>
            //         <div class="extra"> Rating: <div class="ui star rating" data-rating={this.props.recipe.rating}></div>
            //         </div>
            //     </div>
            // </div>
        )
    }

}

export default RecipeCard




{/* <div >
    <h2>{this.props.recipe.title}</h2>
    <img src={this.props.recipe.img} />
</div> */}




{/* import React from 'react'
import { Card } from 'semantic-ui-react'

const src = '/images/wireframe/white-image.png'

const CardExampleColored = () => (
  <Card.Group itemsPerRow={4}>
    <Card color='red' image={src} />
  </Card.Group>
)

export default CardExampleColored */}
