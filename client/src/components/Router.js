import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './Welcome';
import App from './App';
import PantryList from './PantryList';
import RecipeSearch from './RecipeSearch';
import GroceryList from './GroceryList';
import FavRecipes from './FavRecipes';
// import NotFound from './NotFound';

class Router extends Component {
  state = {
    user: null,
    isLoggedIn: false
  };

  // Persist state with data from local storage on page refresh
  componentWillMount() {
    const user = localStorage.getItem('user');
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    this.setState({ user, isLoggedIn });
  }

  // Put user info in state and local storage upon successful sign in
  logInUser = user => {
    this.setState({
      user: user,
      isLoggedIn: true
    });
    localStorage.setItem('user', user);
    localStorage.setItem('isLoggedIn', true);
  };

  // Send logout request to back-end, set state back to defaults, remove user info from local storage
  logOutUser = () => {
    fetch('auth/logout', {
      method: 'POST',
      headers: {'content-type': 'application/json'}
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({
          user: null,
          isLoggedIn: false
        });
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        return res.json();
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) => {
          return this.state.isLoggedIn === true
            ? <Component {...rest} {...props} />
            : <Redirect to="/" />;
        }}
      />
    );

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Welcome
                logInUser={this.logInUser}
                push={props.history.push}
              />
            )}
          />
          <PrivateRoute
            path="/:user/grocerylist"
            component={GroceryList}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/:user/pantrylist"
            component={PantryList}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/:user/recipesearch"
            component={RecipeSearch}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/:user/fav_recipes"
            component={FavRecipes}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/:user"
            component={App}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;