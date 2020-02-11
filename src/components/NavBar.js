import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky } from 'semantic-ui-react'

class NavBar extends Component{

  mapCategories = () => {
    // console.log(this.props)
    const categories = this.props.recipes.map(recipe => {
      return recipe.category
    })
    console.log(categories)
  }

  

  render() {
    return(
      <div className="nav-bar"> 
      {this.mapCategories()}
      {/* {console.log(this.props.recipes)} */}
      <Sticky >                                                                 
        <Menu
          size='massive'
          attached='top'
          tabular
          style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
          <Dropdown item text='Sort By Area'>
            <Dropdown.Menu>
              {/* <Dropdown.Item>{mapCategories()}</Dropdown.Item> */}
              <Dropdown.Item>Turkish</Dropdown.Item>
              <Dropdown.Item>Irish</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown item text='Sort By Category'>
            <Dropdown.Menu>
              <Dropdown.Item>Breakfast</Dropdown.Item>
              <Dropdown.Item>Lunch</Dropdown.Item>
              <Dropdown.Item>Dinner</Dropdown.Item>
              <Dropdown.Item>Desser</Dropdown.Item>
              <Dropdown.Item>Vegetarian</Dropdown.Item>
              <Dropdown.Item>Seafood</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Menu.Item>
            <Input className='icon' icon='search'  placeholder='Search...' />
          </Menu.Item>
          
        <div className="right menu">
        <Menu>
          <Menu.Item floated='right'>
              <Button primary >Sign up</Button>
            </Menu.Item>

            <Menu.Item floated='right'>
              <Button >Log-in</Button>
            </Menu.Item>
            
            <Menu.Item floated='right'>
              <Button >Log-out</Button>
            </Menu.Item>
          </Menu>
        </div>

        </Menu>
      </Sticky>
      </div> 
    )
  }


}

export default NavBar;



// https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzDLV4KOwUnZSzw-SKsdxQi3QwRUmy6UtI6cQB6rwfoJixY9o1

// const areas = Recipe.all.map {|rec| rec.area}.uniq
