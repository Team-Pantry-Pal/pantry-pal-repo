import React, { Component } from "react";
import {
  NavItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Signup from "./Signup";
import styles from "../styles/SignInNav.module.css";

class SignInNav extends Component {
  state = {
    usernameField: "",
    passwordField: "",
  };

  usernameField = e => {
    this.setState({ usernameField: e.target.value });
  };

  passwordField = e => {
    this.setState({ passwordField: e.target.value });
  };

  loginSubmit = e => {
    // Check form id b/c sumbit button on Signup form on modal will cause this form to submit also
    //if (e.target.id === "loginForm") {
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
          this.props.push(`/${user.username}/`);
        })
        .catch(err => console.log(err));
    //}
  };

  render() {
    return (
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
            <Signup
              push={this.props.push}
              logInUser={this.props.logInUser}
            />
        </Form>
      </NavItem>
    );
  }
}

export default SignInNav;