import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import GroceryList from './components/GroceryList';
import RecipeSearch from './components/RecipeSearch';
import PantryList from './components/PantryList';
import Signup from './components/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <Signup />
          <PantryList />
          <RecipeSearch />
          <GroceryList />
        </Container>
      </div>
    );
  }
}

export default App;
