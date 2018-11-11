import React, { Component } from "react";
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
    ingredients: []
  };

  componentDidMount(err) {
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
      })
      .catch(err);
  }

  viewDetails = _id => {
    this.toggle();
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    if (this.state.randomRecipes.recipes) {
      var details = this.state.randomRecipes.recipes[0];
      var ingredients = details.extendedIngredients; 
      // this.setState({ingredients}); 
    } else {
      details = [];
    }
    console.log(details); 
    console.log(ingredients); 

    return (
      <div className="random-recipe">
        <Container>
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
            <CardImg top width="100%" src={details.image} />
            <ModalBody>
              <h6>Prep Time: {details.preparationMinutes} Minutes</h6>
              <h6>Cooking Time: {details.readyInMinutes} Minutes</h6>
              <h6>Servings: {details.servings}</h6>
              <h6>Source: {details.sourceName}</h6>
              <h6>Ingredients:</h6>
              {/* <ul style={{ listStyleType: "none" }}>
                {ingredients.map}
              </ul> */}
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
