// This is the first attempt at AutoComplete using Reactstrap's Dropdown component.
// Reactstrap's Dropdown did't appear to be quite appropriate for an
// autocomplete application as focus does not move from input field
// to dropdown menu with Tab or arrow keys.

import React, { Component } from 'react';
import { Container, Jumbotron, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

class AutoComp2 extends Component {
  state = {
    foodItemBox: "",
    autoCompleteData: [],
    dropdownOpen: false
  };

  refForFocus = React.createRef();

  inputChange = (event) => {
    this.setState({ foodItemBox: event.target.value }, () => {
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?&number=10&query=${this.state.foodItemBox}`, {
        method: 'GET',
        headers: {
          'X-Mashape-Key': 'oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(autoCompleteData => {
        this.setState({ autoCompleteData });
        if (this.state.autoCompleteData.length > 0) {
          this.setState({ dropdownOpen: true });
        } else {
          this.setState({ dropdownOpen: false });
        }
      })
      .catch(err => console.error(err));
    });
  };

  fakeToggle = () => {};

  selectFood = (food) => {
    this.setState({
      foodItemBox: food.name,
      autoCompleteData: [],
      dropdownOpen: false
    });
  };

  handleArrowKeys = (event) => {
    if (event.key === "ArrowDown") {
      this.refForFocus.current.focus();
    }
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          <h3>AutoComplete Search</h3>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.fakeToggle}>
            <DropdownToggle tag="span" onKeyDown={this.handleArrowKeys}>
              <Input
                type="text"
                name="foodItem"
                id="newFoodItem"
                style={{maxWidth: "18em"}}
                placeholder="Enter some shit"
                value={this.state.foodItemBox}
                onChange={this.inputChange}
              />
            </DropdownToggle>
            <div tabIndex="0" ref={this.refForFocus}>
            <DropdownMenu>
              {this.state.autoCompleteData.map((food, index) => (
                <DropdownItem
                  key={index}
                  onClick={this.selectFood.bind(this, food)}
                  onMouseEnter={this.mouse}
                >
                  {food.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
            </div>
          </Dropdown>
        </Jumbotron>
      </Container>
    );
  }
}

export default AutoComp2;