import React, { Component, Fragment } from "react";
import { MyContext } from "./MyProvider";
import Signup from "./Signup";
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
} from "reactstrap";
import styles from "../styles/AppNavbar.module.css";

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

  usernameField = e => {
    this.setState({ usernameField: e.target.value });
  };

  passwordField = e => {
    this.setState({ passwordField: e.target.value });
  };

  loginSubmit = e => {
    // Check form id b/c bumbit button on Signup form on modal will cause this form to submit also
    if (e.target.id === "loginForm") {
      e.preventDefault();
      //console.log("LoginSubmit function fired");
      const username = this.state.usernameField;
      const password = this.state.passwordField;
      const credentials = {
        username: username,
        password: password
      };
      fetch("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "content-type": "application/json" }
      })
        .then(res => res.json())
        .then(user => {
          //console.log(user);
          this.props.logInUser(user.username);
          this.props.push(`/${user.username}`);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Fragment>
        <Navbar color="dark" dark expand="sm">
          <Container fluid>
            <NavbarBrand href="/">My Pantry Pal</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto">
                <NavItem className={styles.login}>
                  <Form
                    id="loginForm"
                    inline
                    onSubmit={this.loginSubmit}
                  >
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="username" className="mr-sm-2" />
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        onChange={this.usernameField}
                      />
                      <Label for="examplePassword" className="mr-sm-2" />
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="password"
                        onChange={this.passwordField}
                      />
                    </FormGroup>
                    <Button className={styles.loginBtn}>Login</Button>
                    <MyContext.Consumer>
                      {context => (
                        <Signup
                          push={context.push}
                          logInUser={context.logInUser}
                        />
                      )}
                    </MyContext.Consumer>
                  </Form>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

export default AppNavbar;
