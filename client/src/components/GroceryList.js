import React, { Component } from "react";
import DashNav from "./DashNav";
import { Container, ListGroup, ListGroupItem, Button, Input, Form, FormGroup, Jumbotron } from "reactstrap";
import "./GroceryList.css";

class GroceryList extends Component {

  state = {
    groceryItems: [],
    shoppingCart: [],
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
    const groceryItems = this.state.groceryItems.filter(item => item._id !== _id);
    const shoppingCart = this.state.shoppingCart;
    this.state.groceryItems.forEach(item => {
      if (item._id === _id) {
        shoppingCart.push(item);
      }
    });
    this.setState({ groceryItems, shoppingCart });
  };

  dontGotIt = (_id) => {
    const shoppingCart = this.state.shoppingCart.filter(item => item._id !== _id);
    const groceryItems = this.state.groceryItems;
    this.state.shoppingCart.forEach(item => {
      if (item._id === _id) {
        groceryItems.push(item);
      }
    });
    this.setState({ shoppingCart, groceryItems });
  };

  checkout = () => {
    const payload = {
      user: this.props.user,
      shoppingCart: this.state.shoppingCart
    }
    fetch('api/pantry', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(msg => {
        console.log(msg);
        if (msg.success === true) {
          this.setState({ shoppingCart: [] });
        }
        return msg;
      })
      .catch(err => console.error(err.message))
  };

  render() {
    const { groceryItems } = this.state;
    const { shoppingCart } = this.state;
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
                <Input
                  type="text"
                  name="item"
                  id="newGroceryItem"
                  bsSize="sm"
                  style={{maxWidth: "18em"}}
                  placeholder="Add new grocery item"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Input
                  type="number"
                  name="quantity"
                  id="newGroceryQty"
                  bsSize="sm"
                  style={{maxWidth: "6em"}}
                  placeholder="Enter quantity"
                  value={this.state.qtyVal}
                  onChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="unitOm"
                  id="newGroceryUnit"
                  bsSize="sm"
                  style={{maxWidth: "10em"}}
                  placeholder="Enter unit of measure"
                  value={this.state.unitOm}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit">
                Add Item
              </Button>
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
          {this.state.shoppingCart.length > 0 &&
            <Jumbotron>
              <h3>Shopping Cart</h3>
              <ListGroup>
                {shoppingCart.map(({_id, name, quantity, unitOm}) => (
                  <ListGroupItem key={_id}>
                    {name} ({quantity} {unitOm})
                    <Button
                      color="danger"
                      size="sm"
                      style={{float: "right"}}
                      onClick={this.dontGotIt.bind(this, _id)}
                    >
                      Don't got it!
                    </Button>
                  </ListGroupItem>
              ))}
              </ListGroup>
              <br />
              <Button onClick={this.checkout} style={{float: "right"}}>Checkout</Button>
            </Jumbotron>
          }
        </Container>
      </div>
    );
  }
}

export default GroceryList;
