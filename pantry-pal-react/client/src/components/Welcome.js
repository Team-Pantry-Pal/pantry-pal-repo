import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import RecipeSearch from './RecipeSearch';
import Dummy from './Dummy';
import MyProvider from './MyProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <MyProvider push={this.props.history.push}>
            <Dummy />
          </MyProvider>
          <RecipeSearch />
        </Container>
      </div>
    );
  }
}

export default Welcome;