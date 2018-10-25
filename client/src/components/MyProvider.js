import React, { Component } from 'react';

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    push: this.props.push
  };

  render() {
    const context = {
      push: this.state.push,
      logInUser: this.props.logInUser
    };
    return (
      <MyContext.Provider value={context}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;