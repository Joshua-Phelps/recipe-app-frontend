import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = () => {
        // this.props.fetchRecipes(this.props.onLogin(this.state))
        this.props.onLogin(this.state)
        if (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id){
            this.props.history.push('/my-page')
        } else {
            this.props.history.push('/login')
            this.setState({ password: ''})
        }

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    render(){
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    {/* <Image src='https://image.shutterstock.com/image-vector/hungry-emoticon-emoji-symbol-yummy-260nw-765991756.jpg' /> Log-in to your account */}
                </Header>
                <Form size='large' onSubmit={this.handleLogin}>
                    <Segment stacked>
                    <Form.Input fluid icon='user' onChange={this.handleChange} value={this.state.username} name='username' iconPosition='left' placeholder='username' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        value={this.state.password}
                    />

                    <Button color='teal' fluid size='large'>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>
                </Grid.Column>
            </Grid>

        )
    }

} 


export default LoginForm