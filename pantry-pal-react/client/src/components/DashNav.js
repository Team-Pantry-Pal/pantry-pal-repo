import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button } from 'reactstrap';
  import { Link } from 'react-router-dom';

export default class DashNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    this.props.logOutUser();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <div className="navbar-brand">
            <Link to={`/user/${user}`}>Pantry Pal</Link>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to={`/user/${user}/grocerylist`}>Grocery List</Link>
              </NavItem>
              <NavItem>
              <Link to={`/user/${user}/pantrylist`}>Pantry List</Link>
              </NavItem>
              <NavItem>
              <Link to={`/user/${user}/recipesearch`}>Recipe Search</Link>
              </NavItem>
            </Nav>
            <Button onClick={this.logout}>Logout</Button>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}