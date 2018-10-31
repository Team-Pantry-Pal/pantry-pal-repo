import React, { Component } from "react";
import DashNav from "./DashNav";
import { Container, ListGroup, ListGroupItem, Button, Input, Form, FormGroup, Label, Jumbotron } from "reactstrap";
import "./GroceryList.css";

class GroceryList extends Component {

  state = {
    groceryItems: [],
    value: '',
    qtyVal: '',
    unitOm: '',
    gotIt: {}
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
      this.setState({ groceryItems: data.grocerylist })
    })
    .catch(err => console.error(err));
  }

  handleChange = (event) => {
    const target = event.target;
    if (target.id === "newGroceryItem") {
      this.setState({ value: target.value });
    } else if (target.id === "newGroceryQty") {
      // So value for qtyVal in state won't be null if input box is cleared
      if (target.value) {
        const qtyVal = parseInt(target.value, 10);
        this.setState({ qtyVal });
        } else if (!target.value) {
          this.setState({ qtyVal: ''});
        }
    } else if (target.id === "newGroceryUnit") {
      this.setState({ unitOm: target.value });
    }
  };

  addItem = (e) => {
    e.preventDefault();
    let payload = {
      newItems: [{
        name: this.state.value,
        quantity: this.state.qtyVal,
        unitOm: this.state.unitOm
      }],
      user: this.props.user
    };
/*
    // Promise approach
    fetch('api/grocerylist', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(newItem => {
        console.log(newItem);
        let groceryItems = this.state.groceryItems;
        groceryItems.push(newItem);
        this.setState({ groceryItems, value: '' });
      })
      .catch(err => console.error(err.message));
*/
    // Async/await approach
    const addItemDB = async () => {
      try {
        const res = await fetch('api/grocerylist', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' }
        });
        let newItem = await res.json();
        newItem = newItem[0];
        console.log(newItem);
        const groceryItems = this.state.groceryItems;
        groceryItems.push(newItem);
        this.setState({ groceryItems, value: '' });
      }
      catch (err) {
        console.error(err.message);
      }
    }
    addItemDB();
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

  gotIt = (_id) => {
    this.setState({ gotIt: {textDecoration: "line-through"}});
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
            <Form onSubmit={this.addItem}>
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
                <Input
                  type="number"
                  name="quantity"
                  id="newGroceryQty"
                  placeholder="Enter quantity"
                  value={this.state.qtyVal}
                  onChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="unitOm"
                  id="newGroceryUnit"
                  placeholder="Enter unit of measure"
                  value={this.state.unitOm}
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
                <ListGroupItem key={_id} style={this.state.gotIt}>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.deleteItem.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name} ({quantity} {unitOm})
                  <Button
                    color="primary"
                    size="sm"
                    style={{float: "right"}}
                    onClick={this.gotIt.bind(this, _id)}
                  >
                    Got it!
                  </Button>
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
