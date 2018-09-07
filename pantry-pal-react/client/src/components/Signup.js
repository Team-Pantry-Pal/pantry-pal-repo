import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    isLoggedIn: false
  };

  submitForm = (e) => {
    e.preventDefault();
    //take in and store form data
    const userName = this.state.username;
    const userPassword = this.state.password;
    //send data to backend post method
    const userObject = {
      username: userName,
      password: userPassword
    };
    fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userObject),
      headers: {'content-type': 'application/json'}
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
    /*
    .then(res, err => {
       console.log(err)
       console.log(res);
       res.json();
      })
      .then(res => {
       console.log(res);
       this.setState({ isLoggedIn: true});
       console.log('worked');
      })
      .catch(err => err);
    */
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <Jumbotron>
        <Form onSubmit={this.submitForm}>
          <h3>Sign Up</h3>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={this.handleUsernameChange}
            />
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Jumbotron>
    );
  }
}

export default Signup;