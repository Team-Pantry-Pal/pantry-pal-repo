import React, { Component } from 'react';
import { Container, Jumbotron, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, CardDeck, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Alert from 'react-s-alert';
import Header from "./Header";
import SearchCard from './SearchCard';

class PantryList extends Component {
  state = {
    user: '',
    pantryItems: [],
    value: '',
    qtyVal: '',
    unitOm: '',
    searchResults: [],
    recipeDetails: {},
    modal: false
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ user });
    const userPayload = { user };
    let pantryItems;

    fetch('api/pantry/list', {
      method: 'POST',
      body: JSON.stringify(userPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      // Add a "checked" property for each item to track its checkbox
      pantryItems = data.pantrylist.map(item => {
        item.checked = false;
        return item;
      });
      this.setState({ pantryItems });
    })
    .catch(err => console.error(err.message));
  }

  handleChange = e => {
    const target = e.target;
    if (target.id === "newPantryItem") {
      this.setState({ value: target.value });
    } else if (target.id === "newPantryQty") {
      // So value for qtyVal in state won't be null if input box is cleared
      if (target.value) {
        const qtyVal = parseInt(target.value, 10);
        this.setState({ qtyVal });
        } else if (!target.value) {
          this.setState({ qtyVal: ''});
        }
    } else if (target.id === "newPantryUnit") {
      this.setState({ unitOm: target.value });
    }
  };

  addItem = e => {
    e.preventDefault();
    const data = {
      user: this.props.user,
      newItem: [{
        name: this.state.value,
        qty: this.state.qtyVal,
        unit: this.state.unitOm
      }]
    };

    fetch('api/pantry', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(payload => {
      console.log(payload);
      let { pantryItems } = this.state;
      payload.addedItem.checked = false; // Add "checked" property
      pantryItems.push(payload.addedItem);
      this.setState({ pantryItems });
    })
    .catch(err => console.error(err.message));

    this.setState({
      value: '',
      qtyVal: '',
      unitOm: ''
    });
  };

  deleteItem = _id => {
    const payload = {
      user: this.props.user,
      itemId: _id
    };

    fetch('api/pantry', {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(success => {
      console.log(success);
      this.setState(state => ({
        pantryItems: state.pantryItems.filter(item => item._id !== _id)
      }));
    })
    .catch(err => console.error(err.message));
  };

  pantrySearch = e => {
    e.preventDefault();
    let { pantryItems } = this.state;
    let searchArray = []; // Array we'll populate with ingredients to search by
    // Check each pantry item for a checked checkbox
    pantryItems.forEach(item => {
      if (item.checked === true) {
        // Add it to the searchArray is its checkbox is checked
        searchArray.push(item.name);
      }
    });
    const searchData = { ingredients: searchArray.toString() };

    fetch('api/recipe-search', {
      method: 'POST',
      body: JSON.stringify(searchData),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(results => this.setState({ searchResults: results }))
    .catch(err => console.error(err.message));
  };

  handleTick = e => {
    const target = e.target;
    let { pantryItems } = this.state;
    // If the checkbox was checked...
    if (target.checked === true) {
      pantryItems = pantryItems.map(item => {
        // ... find that item and set its "checked" property to true
        if (item._id === target.id) {
          item.checked = true;
          return item;
        } else {
          return item;
        }
      });
      this.setState({ pantryItems });
      // If the checkbox was unchecked...
    } else if (target.checked === false) {
      pantryItems = pantryItems.map((item) => {
        // ... find that item and set its "checked" property to false
        if (item._id === target.id) {
          item.checked = false;
          return item;
        } else {
          return item;
        }
      });
      this.setState({ pantryItems });
    }
  };

  clearChecks = () => {
    let { pantryItems } = this.state;
    pantryItems = pantryItems.map(item => {
      // Look for any checked boxes and set them to false
      if (item.checked === true) {
        item.checked = false;
        return item;
      } else {
        return item;
      }
    });
    this.setState({ pantryItems });
  };

  recipeDetails = (id, e) => {
    e.preventDefault();
    let recipeId = { idNumber: id };

    fetch("api/recipe-search/recipedetails", {
      method: "POST",
      body: JSON.stringify(recipeId),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(result => this.setState({ recipeDetails: result }))
    .then(() => this.toggle())
    .catch(err => console.error(err.message));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  addToFavs = () => {
    const { recipeDetails } = this.state;
    const favPayload = {
      user: this.props.user,
      newFav: {
        servings: recipeDetails.servings,
        extendedIngredients: recipeDetails.extendedIngredients,
        id: recipeDetails.id,
        title: recipeDetails.title,
        readyInMinutes: recipeDetails.readyInMinutes,
        image: recipeDetails.image,
        instructions: recipeDetails.instructions
      }
    };

    fetch("api/fav-recipes/addfav", {
      method: "POST",
      body: JSON.stringify(favPayload),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(success => {
      // show user confirmation
      console.log(success);
      if (success.success === true) {
        Alert.success("<i class='fas fa-check-circle fa-lg'></i><p>Recipe added to Favs!</p>", {
          position: 'bottom-right',
          effect: 'stackslide',
          html: true,
          timeout: 4000
        });
      }
    })
    .catch(err => console.error(err.message));
  };

  render() {
    const {
      pantryItems,
      searchResults,
      recipeDetails
    } = this.state;

    let ingredients = [];
    if (this.state.recipeDetails.extendedIngredients) {
      ingredients = this.state.recipeDetails.extendedIngredients;
    }

    return (
      <div className="pantrylist">
        <Header
          user={this.props.user}
          isLoggedIn={this.props.isLoggedIn}
          logOutUser={this.props.logOutUser}
        />
        <Container>
          <Jumbotron>
            <h3>Pantry List</h3>
            <Form onSubmit={this.addItem}>
              <FormGroup>
                <Input
                  type="text"
                  name="item"
                  id="newPantryItem"
                  bsSize="sm"
                  style={{maxWidth: "18em"}}
                  placeholder="new pantry item"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Input
                  type="number"
                  name="qty"
                  id="newPantryQty"
                  bsSize="sm"
                  style={{maxWidth: "6em"}}
                  placeholder="qty"
                  value={this.state.qtyVal}
                  onChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="unit"
                  id="newPantryUnit"
                  bsSize="sm"
                  style={{maxWidth: "10em"}}
                  placeholder="unit"
                  value={this.state.unitOm}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit">
                Add Item
              </Button>
            </Form>
            </Jumbotron>
            <Jumbotron>
            <Form onSubmit={this.pantrySearch}>
              <ListGroup>
                <FormGroup check>
                  {pantryItems.map(({ _id, name, qty, unit, checked }) => (
                    <ListGroupItem key={_id}>
                      <Label check>
                        <Input
                          addon
                          type="checkbox"
                          id={_id}
                          name="pantryIng"
                          value={name}
                          checked={checked}
                          onChange={this.handleTick}
                        />
                        {} {name} ({qty} {unit})
                      </Label>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        style={{float: "right"}}
                        onClick={this.deleteItem.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    </ListGroupItem>
                  ))}
                  <br />
                  <Button type="submit">Get Recipes</Button>
                  <Button style={{'float': 'right'}} onClick={this.clearChecks}>Clear checkboxes</Button>
                </FormGroup>
              </ListGroup>
            </Form>
            </Jumbotron>
            <br />
            <CardDeck>
              {searchResults.map(recipe => (
                <SearchCard
                  key={recipe.id}
                  recipeInfo={recipe}
                  recipeDetails={this.recipeDetails}
                />
              ))}
            </CardDeck>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}>
              {recipeDetails.title}
            </ModalHeader>
            <ModalBody>
              <img
                id="myImg"
                src={recipeDetails.image}
                width="100%"
                alt="recipe"
              />
              <h6>Prep Time: {recipeDetails.preparationMinutes} Minutes</h6>
              <h6>Cooking time: {recipeDetails.readyInMinutes} Minutes</h6>
              <h6>Servings: {recipeDetails.servings}</h6>
              <h6>Source: {recipeDetails.sourceName}</h6>
              <h6>Ingredients:</h6>
              <ul style={{ listStyleType: "none" }}>
                {ingredients.map(({ id, name, amount, unit }) => (
                  <li key={id} style={{ listStyleType: "square" }}>
                    {name} {amount} {unit}
                  </li>
                ))}
              </ul>
              <Button onClick={this.addToFavs}>Add to Favs</Button>
            </ModalBody>
          </Modal>
        </Container>
        <Alert stack={{limit: 1}} />
      </div>
    );
  }
}

export default PantryList;