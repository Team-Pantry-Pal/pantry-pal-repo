import React, { Component } from "react";
import RandomRecipes from "./RandomRecipes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <RandomRecipes
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
      </div>
    );
  }
}

export default App;
