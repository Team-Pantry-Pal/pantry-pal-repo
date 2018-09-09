import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    push: this.props.push
  };

  render() {
    return (
      <MyContext.Provider value={this.state.push}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;