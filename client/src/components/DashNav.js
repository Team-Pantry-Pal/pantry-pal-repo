import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button } from 'reactstrap';
import styles from '../styles/DashNav.module.css';

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
            <NavLink to={`/user/${user}`}>Pantry Pal</NavLink>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className={styles.navItem}>
                <NavLink to={`/user/${user}/grocerylist`}>Grocery List</NavLink>
              </NavItem>
              <NavItem className={styles.navItem}>
                <NavLink to={`/user/${user}/pantrylist`}>Pantry List</NavLink>
              </NavItem>
              <NavItem className={styles.navItem}>
                <NavLink to={`/user/${user}/recipesearch`}>Recipe Search</NavLink>
              </NavItem>
              <NavItem className={styles.navItem}>
                <NavLink to={`/user/${user}/fav_recipes`}>Fav Recipes</NavLink>
              </NavItem>
            </Nav>
            <Button onClick={this.logout}>Logout</Button>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}