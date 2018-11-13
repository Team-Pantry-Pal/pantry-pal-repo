
import React, { Component } from "react";
import DashNav from './DashNav';
import {
  Container,
  CardDeck,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
//import things here

class RandomRecipes extends Component {
  state = {
    randomRecipes: []
  };

  componentDidMount(err) {
    console.log("componentWillMount worked");
    //fired before the render method
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random`,
      {
        method: "GET",
        headers: {
          "X-Mashape-Key": "oAClzEfOdWmshwyHDlUeJVmEnmLdp1AKiOIjsnobfNbVPkxYvZ"
        }
      }
    )
      .then(res => res.json())
      .then(randomRecipe => {
        this.setState({ randomRecipes: randomRecipe });
      })
      .catch(err);
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    if (this.state.randomRecipes.recipes) {
      console.log("it works");
      var details = this.state.randomRecipes.recipes[0];
      console.log(details.title);
    } else {
      details = [];
    }

    return (
      <div className="random-recipe">
        <DashNav user={this.props.user} logOutUser={this.props.logOutUser} />
        <Container>
          <h1>What's popular now</h1>
          <CardDeck>
            <Card>
              <CardImg top width="100%" src={details.image} />
              <CardBody>
                <CardTitle>{details.title}</CardTitle>
                <Button>View Recipe</Button>
              </CardBody>
            </Card>
          </CardDeck>
        </Container>
      </div>
    );
  }
}

//Next look at carousel
export default RandomRecipes;