import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

class SearchCard extends Component {
  render() {
    const { title, image, id } = this.props.recipeInfo;
    return (
      <Card>
        <CardImg top width="100%" src={image} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <Button onClick={this.props.recipeDetails.bind(this, id)}>
            View Recipe
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default SearchCard;