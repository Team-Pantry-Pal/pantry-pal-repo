import React, { Component } from "react";
import DashNav from "./DashNav";
import UserWelcome from "./UserWelcome";
import Alert from "react-s-alert";
import {
  Container,
  CardDeck,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

class RandomRecipes extends Component {
  state = {
    randomRecipes: [],
    modal: false,
    ingredients: [],
    details: {}
  };

  componentWillMount() {
    //fired before the render method
    fetch("api/recipe-search/random")
      .then(res => res.json())
      .then(randomRecipe => {
        this.setState({ randomRecipes: randomRecipe });
        this.setState({
          ingredients: randomRecipe.recipes[0].extendedIngredients
        });
        this.setState({
          details: randomRecipe.recipes[0]
        });
      })
      .catch(err => console.log(err));
  }

  addToFavs = () => {
    const { details } = this.state;
    const favPayload = {
      user: this.props.user,
      newFav: {
        servings: details.servings,
        extendedIngredients: details.extendedIngredients,
        id: details.id,
        title: details.title,
        readyInMinutes: details.readyInMinutes,
        image: details.image,
        instructions: details.instructions
      }
    };
    //then fetch request to the database
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
          Alert.success(
            "<i class='fas fa-check-circle fa-lg'></i><p>Recipe added to Favs!</p>",
            {
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

  viewDetails = _id => {
    this.toggle();
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    const ingredients = this.state.ingredients;
    const details = this.state.details;

    return (
      <div className="random-recipe">
        <DashNav user={this.props.user} logOutUser={this.props.logOutUser} />
        <UserWelcome user={this.props.user} />
        <Container>
          <CardDeck>
            <Card>
              <h1>Try something new</h1>
              <CardImg top width="100%" src={details.image} />
              <CardBody>
                <CardTitle>{details.title}</CardTitle>
                <Button onClick={this.viewDetails}>View Recipe</Button>
              </CardBody>
            </Card>
          </CardDeck>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{details.title}</ModalHeader>
            <ModalBody>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={details.image}
                  alt={details.title}
                />
                <CardBody>
                  <CardTitle>{details.title}</CardTitle>
                  <h6>Prep Time: {details.preparationMinutes} Minutes</h6>
                  <h6>Cooking Time: {details.readyInMinutes} Minutes</h6>
                  <h6>Servings: {details.servings}</h6>
                  <h6>Source: {details.sourceName}</h6>
                  <h6>Ingredients:</h6>
                  <ul style={{ listStyleType: "none" }}>
                    {this.state &&
                      this.state.ingredients &&
                      ingredients.map(({ id, name }) => (
                        <li key={id} style={{ listStyleType: "square" }}>
                          {name}
                        </li>
                      ))}
                  </ul>
                  <h6>Instructions: {details.instructions}</h6>
                </CardBody>
              </Card>
              <Button color="primary" onClick={this.addToFavs}>
                Add to Favs
              </Button>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default RandomRecipes;