import React, { Component } from "react";
import RandomRecipes from "./RandomRecipes";

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