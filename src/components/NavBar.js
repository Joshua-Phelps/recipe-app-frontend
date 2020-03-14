import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky, Image } from 'semantic-ui-react'
import {Link} from  'react-router-dom';
import logo2 from '../images/logo-small.png'

class NavBar extends Component{

  handleLogin = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      localStorage.clear()
    } 
    this.props.onClearLoggedIn()
  }

  uniqCategories = () => {
    // const uniq = this.props.recipes.map(recipe => recipe.recipe.category).filter((v, i, a) => a.indexOf(v) === i).sort().map(category => category)
    //   uniq.splice(0, 1, "All")
    //   return uniq.map(category => <div className="item"><li>{category}</li></div>)
  }

  uniqAreas = () => {
    // const uniq = this.props.recipes.map(recipe => recipe.recipe.area).filter((v, i, a) => a.indexOf(v) === i).sort().map(area => area)
    //   uniq.splice(0, 1, "All")
    //   return uniq.map(area => <div className="item"><li>{area}</li></div>)
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
      <Sticky style={{padding: "20px"}}>                                                                 
        <Menu
          size='massive'
          attached='top'
          tabular
          margin-bottom="10em"
          style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
          <Dropdown item text={this.props.category !== ''? this.props.category : 'Sort By Category'}>
            <Dropdown.Menu>
                <Dropdown.Item  onClick={(e) => this.handleCategorySelect(e)}>{this.uniqCategories()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text={this.props.area !== ''? this.props.area : 'Sort By Area'}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => this.handleAreaSelect(e)}>{this.uniqAreas()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Menu.Item>
            <Input className='icon' value={this.props.search} icon='search' onChange={this.handleChange}  placeholder='Search...' />
          </Menu.Item>
        
          <Menu.Item>
          </Menu.Item>

          <Menu.Item>
    {JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id ? <Image src={logo2} width="130px" centered/> : null}
          </Menu.Item>
              <div className="right menu">
        <Menu>
            <Menu.Item floated='right'>
              <Button ><Link to="/">Home</Link></Button>
            </Menu.Item>
            
            <Menu.Item floated='right'>
    {JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id ? <Button ><Link to="/my-page">{this.props.user.username !== ''? `${this.props.user.username}'s Page` : 'My Page'}</Link></Button> : null }
            </Menu.Item>

            <Menu.Item floated='right'>
              <Button onClick={this.handleLogin} >{JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id ? <Link to="/">Log Out</Link> : <Link to="/login">Log In</Link> }</Button>
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