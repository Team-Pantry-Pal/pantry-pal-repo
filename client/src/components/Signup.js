import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    modal: false,
  };

  submitForm = e => {
    e.preventDefault();
    //take in and store form data
    const { username, password } = this.state;
    const { logInUser, push } = this.props;
    //send data to backend post method
    const userObject = {
      username,
      password
    };

    fetch('auth/signup', {
      method: 'POST',
      body: JSON.stringify(userObject),
      headers: {'content-type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      const newUser = data.username;
      logInUser(newUser);
      push(`/${newUser}`);
    })
    .catch(err => console.error(err));
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.toggle}>Signup</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Signup</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
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
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default Signup;