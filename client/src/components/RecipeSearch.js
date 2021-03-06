import React, { Component, Fragment } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardDeck,
  Jumbotron,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import Alert from "react-s-alert";
import Header from "./Header";
import SearchCard from "./SearchCard";
import AutoComp from './AutoComp';

class RecipeSearch extends Component {
  state = {
    searchResults: [],
    value: '',
    recipeDetails: {},
    modal: false
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  findRecipes = e => {
    e.preventDefault();
    const searchData = { ingredients: this.state.value };

    fetch("api/recipe-search", {
      method: "POST",
      body: JSON.stringify(searchData),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(results => this.setState({ searchResults: results }))
    .catch(err => console.error(err.message));
    this.setState({ value: '' });
  };

  autoCompSearch = autoCompItems => {
    const searchData = { ingredients: autoCompItems };

    fetch("api/recipe-search", {
      method: "POST",
      body: JSON.stringify(searchData),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(searchResults => this.setState({ searchResults }))
    .catch(err => console.error(err.message));
  };

  //second api request to get recipe details
  recipeDetails = (id, e) => {
    e.preventDefault();
    const recipeId = { idNumber: id };

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
      if (success.success === true) {
        Alert.success(
          "<i class='fas fa-check-circle fa-lg'></i><p>Recipe added to Favs!</p>", {
            position: "bottom-right",
            effect: "stackslide",
            html: true,
            timeout: 4000
          }
        );
      }
    })
    .catch(err => console.log(err.message));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { searchResults, recipeDetails } = this.state;
    let ingredients;

    if (recipeDetails.extendedIngredients) {
      ingredients = recipeDetails.extendedIngredients;
    } else {
      ingredients = [];
    }

    return (
      <Fragment>
        <Header
          user={this.props.user}
          isLoggedIn={this.props.isLoggedIn}
          logOutUser={this.props.logOutUser}
        />
        <AutoComp search={this.autoCompSearch} />
        <Container>
          <Jumbotron>
            <Form onSubmit={this.findRecipes}>
              <FormGroup>
                <h3>Search by Ingredient</h3>
                <Label for="recipeSearch">
                  (Separate multiple ingredients with a comma)
                </Label>
                <Input
                  type="search"
                  name="search"
                  id="recipeSearch"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="Enter ingredient"
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Jumbotron>
          <CardDeck>
            {searchResults.map(recipe => (
              <SearchCard
                key={recipe.id}
                recipeInfo={recipe}
                recipeDetails={this.recipeDetails}
              />
            ))}
          </CardDeck>
        </Container>
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
        <Alert stack={{limit: 1}} />
      </Fragment>
    );
  }
}

export default RecipeSearch;