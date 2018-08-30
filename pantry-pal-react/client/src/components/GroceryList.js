import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Input, Form, FormGroup, Label } from "reactstrap";
import "./GroceryList.css";
import PropTypes from "prop-types";

class GroceryList extends Component {

  state = {
    groceryItems: [],
    value: ''
  };

  componentDidMount() {
    fetch('api/grocerylist/')
      .then(res => res.json())
      .then(data => {
        this.setState({ groceryItems: data })
      });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  addItem = (event, err) => {
    event.preventDefault();
    let data = { name: this.state.value };
    fetch('/api/grocerylist', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(newItem => {
        let groceryItems = [...this.state.groceryItems];
        groceryItems.push(newItem);
        //console.log(newItem);
        this.setState({ groceryItems });
        //console.log(this.state.groceryItems);
      })
      .catch(err);
    this.setState({ value: '' });
  };

  deleteItem = (_id) => {
    this.setState(state => ({
      groceryItems: state.groceryItems.filter(item => item._id !== _id)
    }));
    fetch(`/api/grocerylist/${_id}`, { method: 'DELETE' });
  };

  render() {
    const { groceryItems } = this.state;
    //console.log(groceryItems);
    return (
      <Container>
        <Form inline onSubmit={this.addItem}>
          <FormGroup>
            <Label for="newItem"></Label>
            <Input
              type="text"
              name="item"
              id="newItem"
              placeholder="Add new grocery item"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button type="submit">
              Add Item
            </Button>
          </FormGroup>
        </Form>

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
      </Container>
    );
  }
}

export default GroceryList;
