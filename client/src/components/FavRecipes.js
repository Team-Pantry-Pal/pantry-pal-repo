import React, { Component, Fragment } from "react";
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
import Alert from 'react-s-alert';
import Header from "./Header";
import '../styles/FavRecipes.module.css';

class FavRecipes extends Component {
  state = {
    favRecipes: [],
    favDetails: {},
    modal: false
  };

  componentDidMount() {
    const userPayload = { user: this.props.user };

    fetch("api/fav-recipes", {
      method: "POST",
      body: JSON.stringify(userPayload),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      const favRecipes = data.favRecipes;
      this.setState({ favRecipes });
    })
    .catch(err => console.log(err));
  }

  deleteFav = _id => {
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
      const newFavs = this.state.favRecipes.filter(recipe => recipe._id !== _id);
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
    const payload = {
      user: this.props.user,
      newItems: ingList
    };
    let ingList = [];
    const recipeId = this.state.favDetails.id;

    this.state.favDetails.extendedIngredients.map(ing => {
      const ingredient = {
        name: ing.name,
        spoonId: ing.id,
        qty: ing.measures.us.amount,
        unit: ing.measures.us.unitShort,
        recipeId
      };
      ingList.push(ingredient);
      return ingList;
    });

    fetch('api/grocerylist', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(res => {
      if (res.success === true) {
        Alert.success("<ul class='fa-ul'><li><span class='fa-li'><i class='fas fa-check-circle fa-lg FavRecipes_checkIcon__24Y5-'></i></span>Ingredients added to Grocery List!</li></ul>", {
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
      <Fragment>
        <Header
          user={this.props.user}
          isLoggedIn={this.props.isLoggedIn}
          logOutUser={this.props.logOutUser}
        />
        <Container>
          <CardDeck>
            {favRecipes.map(({ _id, image, title }) => (
              <Col key={_id} sm="6" md="4">
                <Card>
                <CardImg
                  src={image}
                  top
                  width="100%"
                  alt="Card image cap"
                />
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
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
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
      </Fragment>
    );
  }
}

export default FavRecipes;