
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
    modal: false
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
      console.log("it works");
      var details = this.state.randomRecipes.recipes[0];
      console.log(details.title);
    } else {
      details = [];
    }

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
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </Container>
      </div>
    );
  }
}

//Next look at carousel
export default RandomRecipes;