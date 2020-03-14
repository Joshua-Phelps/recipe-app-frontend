import React, { Component } from 'react'
import { Form, Segment, Button, Grid, Header, Image, Container } from 'semantic-ui-react'
import logo2 from '../images/logo-small.png'
import { api } from '../services/api'

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
        api.auth.signUp(this.state).then(data => console.log(data))
        // fetch('http://localhost:3000/users', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": 'application/json',
        //         Accept: 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // }).then(() => this.props.history.push('/login'))
    }

    render() {
        return (
            <Container style={{padding: "20px"}}>
            <Image src={logo2} width="250px" centered />
            <Grid textAlign='center' style={{ height: '100vh' }} >
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center' style={{padding: "20px", }}>
                     Create your account
                </Header>
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
                        Signup
                    </Button>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
            </Container>
        )
    }
}

export default SignUp