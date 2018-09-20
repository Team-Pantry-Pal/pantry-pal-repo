import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import GroceryList from './GroceryList';
import RecipeSearch from './RecipeSearch';
import PantryList from './PantryList';
import DashNav from './DashNav';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DashNav /> 
        <Container>
          <RecipeSearch />
        </Container>
      </div>
    );
  }
}

export default App;
