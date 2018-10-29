import React, { Component } from 'react';
import DashNav from "./DashNav";
import SearchCard from './SearchCard';
import { Container, Jumbotron, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, CardDeck, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Alert from 'react-s-alert';
import './PantryList.css';

class PantryList extends Component {

  state = {
    pantryItems: [],
    value: '',
    pantrySelections: [],
    searchResults: [],
    pantryCheckbox: {},
    user: '',
    recipeDetails: {},
    modal: false
  };

  componentDidMount() {
    let { user } = this.props;
    this.setState({ user });
    let userPayload = {
      user: user
    };

    fetch('api/pantry/list', {
      method: 'POST',
      body: JSON.stringify(userPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => this.setState({ pantryItems: data.pantrylist }))
    .catch(err => console.error(err.message));
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  addItem = (e) => {
    e.preventDefault();
    let data = {
      name: { name: this.state.value },
      user: this.props.user
    };
    fetch('api/pantry', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(newItem => {
        console.log(newItem);
        let pantryItems = [...this.state.pantryItems];
        pantryItems.push(newItem);
        this.setState({ pantryItems });
      })
      .catch(err => console.error(err.message));
    this.setState({ value: '' });
  };

  deleteItem = (_id) => {
    let payload = {
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

  pantrySearch = (e) => {
    e.preventDefault();
    let { pantrySelections, pantryCheckbox } = this.state;
    let searchData = { ingredients: pantrySelections.toString() };
    console.log(searchData);
    fetch('api/recipe-search', {
      method: 'POST',
      body: JSON.stringify(searchData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => this.setState({ searchResults: results }))
      .catch(err => console.error(err.message));
    console.log(pantryCheckbox);
    // Clear all checkboxes
  };

  handleTick = (event) => {
    let target = event.target;
    console.log(target);
    let pantrySelections = [...this.state.pantrySelections];
    let checkStatus = {
      pantryItem: target.value,
      checked: target.checked
    };
    if(target.checked) {
      //console.log(target.checked);
      pantrySelections.push(target.value);
      this.setState({ pantrySelections });
      //console.log(pantrySelections);

      // Track PantryItem's checked status in state
      let pantryCheckbox = { ...this.state.pantryCheckbox };
      pantryCheckbox[target.id] = checkStatus;
      this.setState({ pantryCheckbox });

    } if (!target.checked) {
      //console.log(target.checked);
      // Remove the target.value from pantrySelections
      pantrySelections = pantrySelections.filter(name => name !== target.value);
      //console.log(pantrySelections);
      this.setState({ pantrySelections });

      // Track PantryItem's checked status in state
      let pantryCheckbox = { ...this.state.pantryCheckbox };
      pantryCheckbox[target.id].checked = target.checked;
      this.setState({ pantryCheckbox });
    }
  };

  recipeDetails = (id, event) => {
    event.preventDefault();
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
    let { recipeDetails } = this.state;
    let favPayload = {
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
    const { pantryItems } = this.state;
    const { searchResults } = this.state;
    const { recipeDetails } = this.state;

    let ingredients;
    if (this.state.recipeDetails.extendedIngredients) {
      ingredients = this.state.recipeDetails.extendedIngredients;
      console.log(ingredients);
    } else {
      ingredients = [];
    }

    return (
      <div className="pantrylist">
        <DashNav
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
        <Container>
          <Jumbotron>
            <h3>Pantry List</h3>
            <Form inline onSubmit={this.addItem}>
              <FormGroup>
                <Label for="newPantryItem"></Label>
                <Input
                  type="text"
                  name="item"
                  id="newPantryItem"
                  placeholder="Add new pantry item"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Button type="submit">
                  Add Item
                </Button>
              </FormGroup>
            </Form>
            <br />
            <Form onSubmit={this.pantrySearch}>
              <ListGroup>
                <FormGroup check>
                  {pantryItems.map(({ _id, name, quantity, unitOm }) => (
                    <ListGroupItem key={_id}>
                      <Label check>
                        <Input
                          addon
                          type="checkbox"
                          id={_id}
                          name="pantryIng"
                          value={name}
                          onChange={this.handleTick.bind(this, _id)}
                        />
                        {' '} {quantity} {unitOm} of {name}
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
                </FormGroup>
              </ListGroup>
            </Form>
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
          </Jumbotron>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
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