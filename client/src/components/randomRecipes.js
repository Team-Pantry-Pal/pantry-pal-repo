import React, { Component } from "react";
import DashNav from "./DashNav";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardDeck,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Jumbotron
} from "reactstrap";
//imports for modal
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class RecipeSearch extends Component {
  state = {
    searchResults: [],
    value: "",
    recipeDetails: {}
  };

  componentDidMount() {
    let userPayload = { user: this.props.user };

    fetch("api/randomRecipes", {
      method: "GET",
      body: JSON.stringify(userPayload),
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        let randomRecipes = data.favRecipes;
        this.setState({ favRecipes });
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  // findRecipes = (event, err) => {
  //   event.preventDefault();
  //   let searchData = { ingredients: this.state.value };
  //   // console.log(searchData);
  //   fetch("api/recipe-search", {
  //     method: "POST",
  //     body: JSON.stringify(searchData),
  //     headers: { "Content-Type": "application/json" }
  //   })
  //     .then(function(res) {
  //       let shit = res.json();
  //       return shit;
  //     })
  //     .then(results => {
  //       this.setState({ searchResults: results });
  //     })
  //     .catch(err);
  //   this.setState({ value: "" });
  // };
  //second api request to get recipe details
  recipeDetails = (id, event, err) => {
    event.preventDefault();
    let recipeId = { idNumber: id };
    fetch("api/recipe-search/recipedetails", {
      method: "POST",
      body: JSON.stringify(recipeId),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ recipeDetails: result });
        if (this.state.recipeDetails.extendedIngredients) {
          this.toggle();
        }
      })
      .catch(err);
    this.setState({ ID: "" });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { searchResults } = this.state;
    const { recipeDetails } = this.state;
    let ingredients;
    if (this.state.recipeDetails.extendedIngredients) {
      ingredients = this.state.recipeDetails.extendedIngredients;
      console.log(ingredients);
    } else {
      ingredients = [];
    }

    return <div className="search-results" />;
  }
}

export default RecipeSearch;
