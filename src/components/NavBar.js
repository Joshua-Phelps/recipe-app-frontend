import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky } from 'semantic-ui-react'
import {Link} from  'react-router-dom';

class NavBar extends Component{

  uniqCategories = () => {
    const uniq = this.props.recipes.map(recipe => recipe.recipe.category).filter((v, i, a) => a.indexOf(v) === i).sort().map(category => category)
      uniq.splice(0, 1, "All")
      return uniq.map(category => <div className="item"><li>{category}</li></div>)
  }

  uniqAreas = () => {
    const uniq = this.props.recipes.map(recipe => recipe.recipe.area).filter((v, i, a) => a.indexOf(v) === i).sort().map(area => area)
      uniq.splice(0, 1, "All")
      return uniq.map(area => <div className="item"><li>{area}</li></div>)
  }

  handleCategorySelect = (e) => {
    const category = e.target.innerText
    this.props.changeCategory(category)
  }

  handleAreaSelect = (e) => {
    const area = e.target.innerText
    this.props.changeArea(area)
  }

  handleChange = e => {
    this.props.onSearch(e)
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
              <Button ><Link to="/">Home</Link></Button>
            </Menu.Item>
            
            <Menu.Item floated='right'>
              <Button ><Link to="/my-page">My Page</Link></Button>
            </Menu.Item>

            <Menu.Item floated='right'>
              <Button ><Link to="/login">Log In</Link></Button>
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
