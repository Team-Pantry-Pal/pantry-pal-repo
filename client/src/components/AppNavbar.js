import React, { Component } from 'react';
import { MyContext } from './MyProvider';
import Signup from './Signup';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import './AppNavbar.css';

class AppNavbar extends Component {
  state = {
    usernameField: "",
    passwordField: "",
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  usernameField = (e) => {
    this.setState({ usernameField: e.target.value });
  };

  passwordField = (e) => {
    this.setState({ passwordField: e.target.value });
  };

  loginSubmit = (e) => {
    e.preventDefault();
    const username = this.state.usernameField;
    const password = this.state.passwordField;
    const credentials = {
      username: username,
      password: password
    };
    fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'content-type': 'application/json'}
    })
    .then(res => res.json())
    .then(user => {
      //console.log(user);
      this.props.logInUser(user.username);
      this.props.push(`user/${user.username}`);
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Container fluid>
            <NavbarBrand href="/">Pantry Pal</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" >
                <NavItem className="login">
                  <Form inline onSubmit={this.loginSubmit}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="username" className="mr-sm-2"></Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        onChange={this.usernameField}
                      />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="examplePassword" className="mr-sm-2"></Label>
                      <Input
                        type="password"
                          name="password"
                          id="examplePassword" placeholder="password"
                          onChange={this.passwordField}
                        />
                    </FormGroup>
                    <Button>Login</Button>
                  </Form>
                  <MyContext.Consumer>
                    {(context) => (
                      <Signup
                        push={context.push}
                        logInUser={context.logInUser}
                      />
                    )}
                  </MyContext.Consumer>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;