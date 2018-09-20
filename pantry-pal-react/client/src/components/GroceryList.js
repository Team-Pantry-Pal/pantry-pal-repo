import React, { Component } from "react";
import DashNav from "./DashNav";
import { Container, ListGroup, ListGroupItem, Button, Input, Form, FormGroup, Label, Jumbotron } from "reactstrap";
import "./GroceryList.css";

class GroceryList extends Component {

  state = {
    groceryItems: [],
    value: '',
    user: ''
  };

  componentDidMount(err) {
    // Accessing username from URL param
    this.setState({ user: this.props.match.params.id });

    // GET request to load grocerylist
    fetch('api/grocerylist/')
      .then(res => res.json())
      .then(data => {
        this.setState({ groceryItems: data })
      })
      .catch(err);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  addItem = (event, err) => {
    event.preventDefault();
    let data = { name: this.state.value };
    fetch('api/grocerylist', {
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
    fetch(`api/grocerylist/${_id}`, { method: 'DELETE' });
  };

  render() {
    const { groceryItems } = this.state;
    const userParam = this.props.match.params.id;
    return (
      <div className="grocery-list">
        <DashNav userParam={userParam}/>
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
