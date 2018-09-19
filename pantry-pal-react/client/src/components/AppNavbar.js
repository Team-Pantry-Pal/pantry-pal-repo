import React, { Component } from 'react';
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
import Dummy from './Dummy';
import MyProvider from './MyProvider';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar
        color="dark"
        dark expand="sm"
        className="mb-5"
        className="navpadding"
        >
          <Container fluid>
            <NavbarBrand href="/">Pantry Pal</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" >
                <NavItem className="login">
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="exampleEmail" className="mr-sm-2"></Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="examplePassword" className="mr-sm-2"></Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
                    </FormGroup>
                    <Button>Login</Button>
                  </Form>
                  <Dummy />
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