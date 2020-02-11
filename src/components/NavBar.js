import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky } from 'semantic-ui-react'

class NavBar extends Component{

  constructor() {
    super()
    this.state = {
        area: " ",
        category: " "
    }
}
  uniqCategories = () => {
    return this.props.recipes.map(recipe => {
      return recipe.category}).filter((v, i, a) => a.indexOf(v) === i).sort().map(category => {
           return <div className="item"><li>{category}</li></div>
      })
    
  }

  handleChange = e => {
    this.props.onSearch(e)
  }
  
  uniqAreas = () => {
    return this.props.recipes.map(recipe => {
      return recipe.area}).filter((v, i, a) => a.indexOf(v) === i).sort().map(area => {
          return <div className="item"><li>{area}</li></div>
      })
  }

  handleAreaSelect = (e) => {
    this.setState({
      area: e.target.innerText
    }, this.props.filterAllRecipes('area', e.target.innerText))
  }

  handleCategorySelect = (e) => {
    // console.log(e.target.innerText)
    this.setState({
      category: e.target.innerText
    }, this.props.filterAllRecipes('categoty', e.target.innerText))
  }

  render() {    

    return(
      <div className="nav-bar"> 
      {/* {console.log(this.props.recipes)} */}
      <Sticky >                                                                 
        <Menu
          size='massive'
          attached='top'
          tabular
          style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
          <Dropdown item text='Sort By Category'>
            <Dropdown.Menu>
                <Dropdown.Item  onClick={(e) => this.handleCategorySelect(e)}>{this.uniqCategories()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Sort By Area'>
            <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => this.handleAreaSelect(e)}>{this.uniqAreas()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Menu.Item>
            <Input className='icon' value={this.props.search} icon='search' onChange={this.handleChange}  placeholder='Search...' />
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
