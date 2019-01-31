import React from "react";
import { Badge, Jumbotron, Button } from "reactstrap";

function UserWelcome(props) {
  return (
    <Jumbotron>
      <h1>
        <Badge color="primary">
          Welcome to your Pantry Pal, {props.user}!
        </Badge>
      </h1>
      <p className="lead">
        A brief introduction of the app, it's features, and instructions
        will go here.
      </p>
      <hr className="my-2" />
      <p>Info about the user's account can go here.</p>
      <p className="lead">
        <Button color="primary">Learn More</Button>
      </p>
    </Jumbotron>
  );
}

export default UserWelcome;