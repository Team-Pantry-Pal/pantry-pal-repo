import React, { Component } from "react";
import DashNav from "./DashNav";
import { Container, Form, FormGroup, Label, Input, Button, CardDeck, Card, CardImg, CardBody, CardTitle, Jumbotron } from 'reactstrap';
//imports for modal
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class RecipeSearch extends Component {

  state = {
    searchResults: [],
    value: '',
    recipeDetails: {}
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  findRecipes = (event, err) => {
    event.preventDefault();
    let searchData = { ingredients: this.state.value};
    // console.log(searchData);
    fetch('api/recipe-search', {
      method: 'POST',
      body: JSON.stringify(searchData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function(res) {
        let shit = res.json();
        return shit;
      })
      .then(results => {
        this.setState({ searchResults: results });
      })
      .catch(err);
    this.setState({ value: '' });
  };
//second api request to get recipe details
  recipeDetails = (id, event, err) => {
    event.preventDefault();
    let recipeId = { idNumber: id };
    fetch('api/recipe-search/recipedetails', {
      method: 'POST',
      body: JSON.stringify(recipeId),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ recipeDetails: result });
        if (this.state.recipeDetails.extendedIngredients) {
          this.toggle();
        }
      })
      .catch(err);
      this.setState({ ID: '' });
  };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { searchResults } = this.state;
    const { recipeDetails } = this.state;
    let aisle;
    if (this.state.recipeDetails.extendedIngredients) {
      aisle = recipeDetails.extendedIngredients[0].aisle;
    }

    return (
      <div className="search-results">
        <DashNav
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
        <Container fluid={true}>
          <Jumbotron>
            <Form onSubmit={this.findRecipes}>
              <FormGroup>
                <h3>Search by Ingredient</h3>
                <Label for="recipeSearch">(Separate multiple ingredients with a comma)</Label>
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
              <br />
            <CardDeck>
              {searchResults.map(({ id, title, image }
              ) => (
                <Card key={id}>
                  <CardImg top width="100%" src={image} />
                  <CardBody>
                    <CardTitle>{title}</CardTitle>
                  </CardBody>
                  <Button onClick={this.recipeDetails.bind(this, id)}>View Recipe</Button>
                </Card>
              ))
              }
            </CardDeck>
          </Jumbotron>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{recipeDetails.title}</ModalHeader>
            <ModalBody>
              <img id="myImg" src={recipeDetails.image} alt="recipe"></img>
              <h1>Cooking time: {recipeDetails.readyInMinutes} Minutes</h1>
              <h2>Aisle: {aisle}</h2>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default RecipeSearch;