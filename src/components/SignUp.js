import React, { Component } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

class SignUp extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSignUp = () => {
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(() => this.props.history.push('/login'))
    }

    render() {
        return (
            <Form size='large' onSubmit={this.handleSignUp}>
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
        )
    }

}

export default SignUp