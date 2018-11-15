import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class Signup extends Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    modal: false,
  };

  submitForm = e => {
    e.preventDefault();
    //take in and store form data
    const userName = this.state.inputUsername;
    const userPassword = this.state.inputPassword;
    //send data to backend post method
    const userObject = {
      username: userName,
      password: userPassword
    };
    fetch('auth/signup', {
      method: 'POST',
      body: JSON.stringify(userObject),
      headers: {'content-type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data.username);
      //console.log(data._id);
      this.props.logInUser(data.username);
      this.props.push(`user/${data.username}`);
    })
    .catch(err => console.error(err));
  };

  handleUsernameChange = e => {
    this.setState({ inputUsername: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ inputPassword: e.target.value });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Signup</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
      </div>
    );
  }
}

export default Signup;