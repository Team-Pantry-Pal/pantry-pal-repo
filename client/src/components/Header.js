import React, { Component, Fragment } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import SignInNav from './SignInNav';
import AppNav from './AppNav';

class Header extends Component {
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  render() {
    return (
      <Fragment>
        <Navbar dark color="dark" expand="sm">
          <Container fluid>
            <NavbarBrand href="/">PantryPal</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse navbar isOpen={this.state.isOpen}>
              <Nav className="ml-auto" navbar>
                {
                  this.props.isLoggedIn ? (
                    <AppNav
                      user={this.props.user}
                      logOutUser={this.props.logOutUser}
                    />
                  ) : (
                    <SignInNav
                      push={this.props.push}
                      logInUser={this.props.logInUser}
                    />
                  )
                }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

export default Header;