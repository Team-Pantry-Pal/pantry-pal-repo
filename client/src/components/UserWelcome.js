import React, { Component } from "react";
import { Badge, Jumbotron, Button } from "reactstrap";

class UserWelcome extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>
            <Badge color="primary">
              Welcome to your Pantry Pal! {this.props.user}
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
      </div>
    );
  }
}

export default UserWelcome;
