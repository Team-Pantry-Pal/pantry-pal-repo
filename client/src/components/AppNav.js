import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';
import styles from '../styles/DashNav.module.css';

class DashNav extends Component {
  logout = () => {
    this.props.logOutUser();
  };

  render() {
    const { user } = this.props;

    return (
      <Fragment>
        <NavItem className={styles.navItem}>
          <NavLink to={`/${user}/grocerylist`}>Grocery List</NavLink>
        </NavItem>
        <NavItem className={styles.navItem}>
          <NavLink to={`/${user}/pantrylist`}>Pantry List</NavLink>
        </NavItem>
        <NavItem className={styles.navItem}>
          <NavLink to={`/${user}/recipesearch`}>Recipe Search</NavLink>
        </NavItem>
        <NavItem className={styles.navItem}>
          <NavLink to={`/${user}/fav_recipes`}>Fav Recipes</NavLink>
        </NavItem>
        <Button onClick={this.logout}>Logout</Button>
      </Fragment>
    );
  }
}

export default DashNav;