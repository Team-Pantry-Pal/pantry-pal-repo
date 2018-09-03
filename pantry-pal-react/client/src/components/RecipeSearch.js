import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button, CardDeck, Card, CardImg, CardBody, CardTitle, Jumbotron } from 'reactstrap';

class RecipeSearch extends Component {

  state = {
    searchResults: [],
    value: ''
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  findRecipes = (event, err) => {
    event.preventDefault();
    let searchData = { ingredients: this.state.value};
    console.log(searchData);
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

  render() {
    const searchResults = this.state.searchResults;
    //console.log(searchResults);
    return (
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
            {searchResults.map(({ id, title, image }) => (
              <Card key={id}>
                <CardImg top width="100%" src={image} />
                <CardBody>
                  <CardTitle>{title}</CardTitle>
                </CardBody>
              </Card>
            ))}
          </CardDeck>
        </Jumbotron>
      </Container>
    );
  }
}

export default RecipeSearch;