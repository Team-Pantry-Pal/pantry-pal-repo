import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './Welcome';
import App from './App';
import PantryList from './PantryList';
import RecipeSearch from './RecipeSearch';
import GroceryList from './GroceryList';
// import NotFound from './NotFound';

class Router extends Component {
  state = {
    user: null,
    isLoggedIn: false
  };

  componentWillMount() {
    let user = localStorage.getItem('user');
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    // console.log(user, isLoggedIn);
    this.setState({ user, isLoggedIn });
  }

  logInUser = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true
    });
    localStorage.setItem('user', user);
    localStorage.setItem('isLoggedIn', true);
  };

  logOutUser = () => {
    fetch('auth/logout', {
      method: 'POST',
      headers: {'content-type': 'application/json'}
    })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        this.setState({
          user: null,
          isLoggedIn: false
        });
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
      }
    })
    .catch(err => console.error(err));
  };

  render() {
    // Make-shift Route component for protected routes
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route {...rest} render={(props) => {
          //console.log(this);
          // rest is all the props passed to PrivateRoute
          // props is all of Route's props
          // I need to get all of them passed to the component being rendered on the route so that props can be passed from here
          const both = { ...rest, ...props };
          // Now the component being rendered takes with it any prop given straight to the PrivateRoute inline
          if (this.state.isLoggedIn === true) {
            return (
              <Component {...both} />
            )
          } else {
              return (
                <Redirect to="/" />
              )
            }
        }} />
      );
    };

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact path="/"
            render={(props) => <Welcome {...props} logInUser={this.logInUser} />}
          />
          <PrivateRoute
            path="/user/:id/grocerylist"
            component={GroceryList}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/user/:id/pantrylist"
            component={PantryList}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/user/:id/recipesearch"
            component={RecipeSearch}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            logOutUser={this.logOutUser}
          />
          <PrivateRoute
            path="/user/:id"
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