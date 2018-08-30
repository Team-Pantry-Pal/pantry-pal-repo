import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button, CardDeck, Card, CardImg, CardBody, CardTitle } from 'reactstrap';

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
    console.log(event);
    let searchData = { ingredient: this.state.value};
    fetch('api/recipe-search', {
      method: 'POST',
      body: JSON.stringify(searchData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => {
        //console.log(results);
        /*
        let searchResults = [...this.state.searchResults];
        searchResults.push(results);
        */
        this.setState({ searchResults: results });
        console.log(this.state.searchResults);
      })
      .catch(err);
    this.setState({ value: '' });
  };

  render() {
    const searchResults = this.state.searchResults;
    //console.log(searchResults);
    return (
      <Container>
        <Form onSubmit={this.findRecipes}>
          <FormGroup>
            <Label for="recipeSearch">Search by Ingredient</Label>
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

      </Container>
    );
  }
}

export default RecipeSearch;