import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky } from 'semantic-ui-react'
import {Link} from  'react-router-dom';

class NavBar extends Component{

  constructor() {
    super()
    this.state = {
        area: " ",
        category: " "
    }
}

  handleLogin = () => {
    console.log("made it")
    if (JSON.parse(localStorage.getItem("user"))) {
      console.log(localStorage)
      localStorage.clear()
      console.log(localStorage)
    } 
    this.props.onClearLoggedIn()
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
              <Button ><Link to="/">Home</Link></Button>
            </Menu.Item>
            
            <Menu.Item floated='right'>
              {JSON.parse(localStorage.getItem("user")) ? <Button ><Link to="/my-page">My Page</Link></Button> : null }
            </Menu.Item>

            <Menu.Item floated='right'>
              <Button onClick={this.handleLogin} >{JSON.parse(localStorage.getItem("user")) ? <Link to="/">Log Out</Link> : <Link to="/login">Log In</Link> }</Button>
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
