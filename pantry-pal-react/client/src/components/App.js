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
  state = {
    user: ''
  };

  componentDidMount () {
    this.setState({ user: this.props.match.params.id });
  }

  componentDidUpdate() {
    console.log(this.state.user);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <RecipeSearch userParam={this.state.user}/>
        </Container>
      </div>
    );
  }
}

export default App;
