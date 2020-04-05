import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo2 from '../images/logo-small.png'

class LoginForm extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = () => {
        this.props.onLogin(this.state)
        this.props.history.push('/my-page')
        this.setState({username: '', password: ''})
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    render(){
        return (
            <Container style={{padding: "20px"}}>
            <Image src={logo2} width="250px" centered/>
            <Grid textAlign='center' style={{ height: '100vh' }} >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center' style={{padding: "20px", }}>
                        Log-in to your account
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
                        New to us? <Link to='/sign-up'>Sign up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
            </Container>
        )
    }
} 

export default LoginForm