import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

function SearchCard(props) {
  const { title, image, id } = props.recipeInfo;

  return (
    <Card>
      <CardImg
        src={image}
        top width="100%"
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <Button onClick={props.recipeDetails.bind(this, id)}>
          View Recipe
        </Button>
      </CardBody>
    </Card>
  );
}

export default SearchCard;