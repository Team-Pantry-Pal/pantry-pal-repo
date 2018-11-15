import React, { Component } from "react";
import Alert from 'react-s-alert';
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
  ModalFooter,
  Col
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

  makeRecipe = () => {
    let ingList = [];
    const recipeId = this.state.favDetails.id;
    this.state.favDetails.extendedIngredients.map(ing => {
      let ingredient = {
        name: ing.name,
        spoonId: ing.id,
        qty: ing.measures.us.amount,
        unit: ing.measures.us.unitShort,
        recipeId
      };
      ingList.push(ingredient);
      return ingList;
    });
    let payload = {
      user: this.props.user,
      newItems: ingList
    };
    fetch('api/grocerylist', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success === true) {
        Alert.success("<i class='fas fa-check-circle fa-lg'></i><p>Ingredients added to Grocery List!</p>", {
          position: 'bottom-right',
          effect: 'stackslide',
          html: true,
          timeout: 4000
        });
      }
    })
    .catch(err => console.error(err.message));
  }

  toggle = () => {
    // favModalReset clears favDetails when modal closes
    // Put the modal toggle in a Promise
    const favModalReset = new Promise((resolve, reject) => {
      this.setState({ modal: !this.state.modal });
      resolve();
    });
    // Use Promise to reference modal status AFTER it's been set
    favModalReset
      .then(() => {
        if (this.state.modal === false) {
          this.setState({ favDetails: {} });
        }
      });
  };

  render() {
    const favRecipes = this.state.favRecipes;
    const favDetails = this.state.favDetails;
    let ingredients;
    if (this.state.favDetails.extendedIngredients) {
      ingredients = this.state.favDetails.extendedIngredients;
      //console.log(ingredients);
    } else {
      ingredients = [];
    }

    return (
      <div className="fav-recipes">
        <DashNav user={this.props.user} logOutUser={this.props.logOutUser} />
        <Container>
          <CardDeck>
            {favRecipes.map(({ _id, image, title }) => (
              <Col key={_id} sm="6">
                <Card>
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
              </Col>
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
                  <Button onClick={this.makeRecipe}>Make Recipe</Button>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter />
          </Modal>
        </Container>
        <Alert stack={{limit: 1}} />
      </div>
    );
  }
}

export default FavRecipes;