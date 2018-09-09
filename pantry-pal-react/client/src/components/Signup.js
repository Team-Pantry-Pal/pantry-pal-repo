import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';

class Signup extends Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    user: '',
    userId: '',
    isLoggedIn: false,
  };

  submitForm = (e) => {
    e.preventDefault();
    //take in and store form data
    const userName = this.state.inputUsername;
    const userPassword = this.state.inputPassword;
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
    .then(res => res.json())
    .then(data => {
      console.log(data.username);
      console.log(data._id);
      this.setState({
        user: data.username,
        userId: data._id,
        isLoggedIn: true
      });
      const user = this.state.user;
      this.props.push(`/user/${user}`);
    })
    .catch(err => console.error(err));
  };

  handleUsernameChange = (event) => {
    this.setState({ inputUsername: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ inputPassword: event.target.value });
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