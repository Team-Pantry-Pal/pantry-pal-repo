import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button, CardDeck, Card, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Jumbotron } from 'reactstrap';

class RecipeSearch extends Component {

  state = {
    searchResults: [],
    value: '',
    modal: false
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  findRecipes = (event, err) => {
    event.preventDefault();
    let searchData = { ingredient: this.state.value};
    fetch('api/recipe-search', {
      method: 'POST',
      body: JSON.stringify(searchData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function(res) {
        console.log(res);
        let shit = res.json();
        console.log(shit);
        return shit;
      })
      .then(results => {
        //console.log(results);
        /*
        let searchResults = [...this.state.searchResults];
        searchResults.push(results);
        */
        this.setState({ searchResults: results });
        //console.log(this.state.searchResults);
      })
      .catch(err);
    this.setState({ value: '' });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const searchResults = this.state.searchResults;
    //console.log(searchResults);
    return (
      <Container fluid={true}>
        <Jumbotron>
          <Form onSubmit={this.findRecipes}>
            <FormGroup>
              <Label for="recipeSearch"><h3>Search by Ingredient</h3></Label>
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
            {searchResults.map(({ id, title, image }) => (
              <Card key={id}>
                <CardImg top width="100%" src={image} />
                <CardBody>
                  <CardTitle>{title}</CardTitle>
                  <Button onClick={this.toggle}>View Recipe</Button>
                </CardBody>
              </Card>
            ))}
          </CardDeck>
        </Jumbotron>


        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered={true}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>Recipe Title</ModalHeader>
            <Jumbotron>
              <ModalBody>
                Some shit about the recipe. Instructions and Ingredients, shit like that...
              </ModalBody>
            </Jumbotron>
              <ModalFooter>
                <Button onClick={this.toggle}>Add to Favs</Button>
              </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default RecipeSearch;