import React, { Component } from 'react';
import { MyContext } from './MyProvider';
import Signup from './Signup';


class Dummy extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context) => <Signup push={context}/>}
      </MyContext.Consumer>
    );
  }
}

export default Dummy;