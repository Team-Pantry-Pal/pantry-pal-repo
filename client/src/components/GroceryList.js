import React, { Component, Fragment } from "react";
import { Container, ListGroup, ListGroupItem, Button, Input, Form, FormGroup, Jumbotron } from "reactstrap";
import Header from "./Header";
import styles from '../styles/GroceryList.module.css';

class GroceryList extends Component {
  state = {
    groceryItems: [],
    shoppingCart: [],
    item: '',
    qty: '',
    unit: '',
    gotIt: {}
  };

  componentDidMount() {
    const userPayload = { user: this.props.user };

    fetch('api/grocerylist/list', {
      method: 'POST',
      body: JSON.stringify(userPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => this.setState({ groceryItems: data.grocerylist }))
    .catch(err => console.error(err));
  }

  handleChange = e => {
    const target = e.target;
    if (target.id === "newGroceryItem") {
      this.setState({ item: target.value });
    } else if (target.id === "newGroceryQty") {
      // So value for qty in state won't be null if input box is cleared
      if (target.value) {
        const qty = parseInt(target.value, 10);
        this.setState({ qty });
        } else if (!target.value) {
          this.setState({ qty: ''});
        }
    } else if (target.id === "newGroceryUnit") {
      this.setState({ unit: target.value });
    }
  };

  addItem = e => {
    e.preventDefault();
    const payload = {
      newItems: [{
        name: this.state.item,
        qty: this.state.qty,
        unit: this.state.unit
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
      const groceryItems = this.state.groceryItems;
      groceryItems.push(newItem.payload[0]);
      this.setState({ groceryItems, item: '' });
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
        newItem = newItem.payload[0];
        const groceryItems = this.state.groceryItems;
        groceryItems.push(newItem);
        this.setState({
          groceryItems,
          item: '',
          qty: '',
          unit: ''
        });
      }
      catch (err) {
        console.error(err.message);
      }
    }
    addItemDB();
  };

  deleteItem = _id => {
    const payload = {
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

  gotIt = _id => {
    const groceryItems = this.state.groceryItems.filter(item => item._id !== _id);
    const shoppingCart = this.state.shoppingCart;

    this.state.groceryItems.forEach(item => {
      if (item._id === _id) {
        shoppingCart.push(item);
      }
    });

    this.setState({ groceryItems, shoppingCart });
  };

  dontGotIt = _id => {
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
    };

    fetch('api/pantry', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(msg => {
      if (msg.success === true) {
        this.setState({ shoppingCart: [] });
      }
      return msg;
    })
    .catch(err => console.error(err.message))
  };

  render() {
    const { groceryItems, shoppingCart } = this.state;

    return (
      <Fragment>
        <Header
          user={this.props.user}
          isLoggedIn={this.props.isLoggedIn}
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
                  placeholder="new grocery item"
                  value={this.state.item}
                  onChange={this.handleChange}
                />
                <Input
                  type="number"
                  name="qty"
                  id="newGroceryQty"
                  bsSize="sm"
                  style={{maxWidth: "6em"}}
                  placeholder="qty"
                  value={this.state.qty}
                  onChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="unit"
                  id="newGroceryUnit"
                  bsSize="sm"
                  style={{maxWidth: "10em"}}
                  placeholder="unit"
                  value={this.state.unit}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit">
                Add Item
              </Button>
            </Form>
            <br />
            <ListGroup>
              {groceryItems.map(({ _id, name, qty, unitOm }) => (
                <ListGroupItem
                  key={_id}
                  style={this.state.gotIt}
                >
                  <Button
                    className={styles.removeBtn}
                    color="danger"
                    size="sm"
                    onClick={this.deleteItem.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name} ({qty} {unitOm})
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
                {shoppingCart.map(({_id, name, qty, unitOm}) => (
                  <ListGroupItem key={_id}>
                    {name} ({qty} {unitOm})
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
              <Button
                onClick={this.checkout}
                className={styles.checkOutBtn}
              >
                Checkout
              </Button>
            </Jumbotron>
          }
        </Container>
      </Fragment>
    );
  }
}

export default GroceryList;