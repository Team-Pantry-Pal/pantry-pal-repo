import React, {Component} from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';

class AutoComp extends Component {
  state = {
    inputValue: '',
    stateItems: [],
    stateShit: "Some shit in state"
  };

  promiseOptions = inputValue => {
    return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?&number=10&query=${inputValue}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'aFG7BBsiy0mshBjk8nF6pllxvS2Rp1TQ9BujsnBxaotUfeEKk9',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then((spoonData) => {
      let options = spoonData.map((item, index) => {
        return {
          label: item.name,
          value: index
        }
      });
      return options;
    })
    .catch(err => console.error(err));
  };

  handleInputChange = newValue => {
    const inputValue = newValue;
    this.setState({ inputValue });
    return inputValue;
  };

  selectHandler = (selected, action) => {
    console.log(selected, action)
    let stateItems = this.state.stateItems;
    let selectArray = selected;
    // 1. For every item of the selectArray we fire the stateChecker function on it.
    selectArray.forEach(selection => {
      // 4. If stateChecker returns false (meaning the current selection is NOT in the stateArray), that selection gets pushed onto the stateArray. If it returns true, nothing happens.
      if (!stateChecker(stateItems, selection)) {
        stateItems.push(selection.label);
      }
    });
    this.setState({ stateItems });
    // 2. The stateChecker will take the current selection (selectArray) and check it against every item in the stateArray using the for loop.
    function stateChecker(stateItems, selection) {
      for (let i = 0; i < stateItems.length; i++) {
        // 3. If the selection (selectArray) matches the stateArray item, stateChecker returns true, if not--false.
        if (stateItems[i] === selection.label) {
          return true;
        }
      }
      return false;
    }
    // If search bar is cleared, remove stateItems from state
    if (action.action === "clear") {
      this.setState({ stateItems: [] });
    }
    if (action.action === "pop-value") {
      stateItems.pop(stateItems[stateItems.length - 1]);
    }
    if (action.action === "remove-value") {
      console.log(action.removedValue.label);
      stateItems = stateItems.filter((item) => {
        return item !== action.removedValue.label;
      });
      this.setState({ stateItems });
    }
  };

  search = () => {
    let stateItems = this.state.stateItems;
    stateItems = stateItems.join();
    this.props.search(stateItems);
  };

  // Needed for a bug fix
  bugFix = (inputValue, selectValue, selectOptions) => {
    const isNotDuplicated = !selectOptions
      .map(option => option.label)
      .includes(inputValue);
    const isNotEmpty = inputValue !== '';
    return isNotEmpty && isNotDuplicated;
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <h3>React Select AutoComplete</h3>
          <AsyncCreatableSelect
            isMulti
            cacheOptions
            loadOptions={this.promiseOptions}
            onInputChange={this.handleInputChange}
            inputValue={this.state.inputValue}
            onChange={this.selectHandler}
            isValidNewOption={this.bugFix}
          />
          <br />
          <Button onClick={this.search}>Search</Button>
        </Jumbotron>
      </Container>
    );
  }
}

export default AutoComp;