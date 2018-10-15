import React, { Component } from "react";
import DashNav from "./DashNav";
import { Container, ListGroup, ListGroupItem, Button, Input, Form, FormGroup, Label, Jumbotron } from "reactstrap";
import "./GroceryList.css";

class GroceryList extends Component {

  state = {
    groceryItems: [],
    value: ''
  };

  componentDidMount() {
    let userPayload = { user: this.props.user };

    fetch('api/grocerylist/list', {
      method: 'POST',
      body: JSON.stringify(userPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.grocerylist);
      this.setState({ groceryItems: data.grocerylist })
    })
    .catch(err => console.error(err));
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  addItem = (event, err) => {
    event.preventDefault();
    let data = {
      name: { name: this.state.value },
      user: this.props.user
    };
    fetch('api/grocerylist', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(newItem => {
        console.log(newItem);
        let groceryItems = [...this.state.groceryItems];
        groceryItems.push(newItem);
        this.setState({ groceryItems });
      })
      .catch(err);
    this.setState({ value: '' });
  };

  deleteItem = (_id) => {
    let payload = {
      user: this.props.user,
      itemId: _id
    };
    fetch('api/grocerylist', {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(success => {
      this.setState(state => ({
        groceryItems: state.groceryItems.filter(item => item._id !== _id)
      }));
      console.log(success);
    })
    .catch(err => console.log(err));
  };

  render() {
    const { groceryItems } = this.state;
    return (
      <div className="grocery-list">
        <DashNav
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
        <Container>
          <Jumbotron>
            <h3>Grocery List</h3>
            <Form inline onSubmit={this.addItem}>
              <FormGroup>
                <Label for="newGroceryItem"></Label>
                <Input
                  type="text"
                  name="item"
                  id="newGroceryItem"
                  placeholder="Add new grocery item"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Button type="submit">
                  Add Item
                </Button>
              </FormGroup>
            </Form>
            <br />
            <ListGroup>
              {groceryItems.map(({ _id, name, quantity, unitOm }) => (
                <ListGroupItem key={_id}>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.deleteItem.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {quantity} {unitOm} of {name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default GroceryList;
