import React, { Component } from 'react';
import DashNav from "./DashNav";
import {
  Container,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class FavRecipes extends Component {
  state = {
    favRecipes: [],
    favDetails: {},
    modal: false
  };

  componentDidMount() {
    let userPayload = { user: this.props.user };

    fetch("api/fav-recipes", {
      method: "POST",
      body: JSON.stringify(userPayload),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        let favRecipes = data.favRecipes;
        this.setState({ favRecipes });
      })
      .catch(err => console.log(err));
  }

  deleteFav = (_id) => {
    const payload = {
      user: this.props.user,
      recipeId: _id
    };

    fetch('api/fav-recipes', {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(success => {
      console.log(success);
      let newFavs = this.state.favRecipes.filter(recipe => recipe._id !== _id);
      console.log(newFavs);
      this.setState({ favRecipes: newFavs });
    })
    .catch(err => console.log(err));
  }

  viewDetails = _id => {
    let recipes = this.state.favRecipes;
    const matchId = recipe => {
      return recipe._id === _id;
    };
    let favDetails = recipes.find(matchId);

    this.setState({ favDetails });
    this.toggle();
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const favRecipes = this.state.favRecipes;
    const favDetails = this.state.favDetails;
    let ingredients;
    if (this.state.favDetails.extendedIngredients) {
      ingredients = this.state.favDetails.extendedIngredients;
      console.log(ingredients);
    } else {
      ingredients = [];
    }

    return (
      <div className="fav-recipes">
        <DashNav user={this.props.user} logOutUser={this.props.logOutUser} />
        <Container>
          <CardDeck>
            {favRecipes.map(({ _id, image, title }) => (
              <Card key={_id}>
              <CardImg top width="100%" src={image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText></CardText>
                <Button onClick={this.viewDetails.bind(this, _id)}>View Details</Button>

                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={this.deleteFav.bind(this, _id)}
                  >
                    &times;
                  </Button>
                </CardBody>
              </Card>
            ))}
          </CardDeck>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle} />
            <ModalBody>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={favDetails.image}
                  alt={favDetails.title}
                />
                <CardBody>
                  <CardTitle>{favDetails.title}</CardTitle>
                  <h6>Ingredients:</h6>
                  <ul style={{ listStyleType: "none" }}>
                    {ingredients.map(({ id, name }) => (
                      <li key={id} style={{ listStyleType: "square" }}>
                        {name}
                      </li>
                    ))}
                  </ul>
                  <h6>Instructions:</h6>
                  <p>{favDetails.instructions}</p>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter />
          </Modal>
        </Container>
      </div>
    );
  }
}

export default FavRecipes;
