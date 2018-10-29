import React, { Component } from "react";
import RecipeSearch from "./RecipeSearch";
import RandomRecipes from "./RandomRecipes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipeSearch
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
        <h1>What's popular now</h1>
        <RandomRecipes
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
      </div>
    );
  }
}

export default App;
