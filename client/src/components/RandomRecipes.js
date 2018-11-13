import React, { Component } from "react";
import DashNav from './DashNav';
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
  ModalBody,
  ModalFooter
} from "reactstrap";
//import things here

class RandomRecipes extends Component {
  state = {
    randomRecipes: [],
    modal: false,
    ingredients: [],
    details: {}
  };

  componentWillMount(err) {
    console.log("componentWillMount worked");
    //fired before the render method
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random`,
      {
        method: "GET",
        headers: {
          "X-Mashape-Key": "oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ"
        }
      }
    )
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
        <Container>
          <h1>What's popular now</h1>
          <CardDeck>
            <Card>
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
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Do Something
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}

//Next look at carousel
export default RandomRecipes;
