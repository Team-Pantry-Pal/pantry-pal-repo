import React, { Component } from 'react';
import RecipeSearch from './RecipeSearch';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log(this.props.user);
    console.log(this.props.isLoggedIn);
  };

  render() {
    return (
      <div className="App">
        <RecipeSearch
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
      </div>
    );
  }
}

export default App;
