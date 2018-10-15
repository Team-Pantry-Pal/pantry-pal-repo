import React, { Component } from 'react';
import DashNav from "./DashNav";
import { Container, Jumbotron, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, CardDeck, Card, CardImg, CardBody, CardTitle } from 'reactstrap';

class PantryList extends Component {

  state = {
    pantryItems: [],
    value: '',
    pantrySelections: [],
    searchResults: [],
    pantryCheckbox: {},
    user: ''
  };


  componentDidMount() {
    let { user } = this.props;
    this.setState({ user });
    let userPayload = {
      user: user
    };

    fetch('api/pantry/list', {
      method: 'POST',
      body: JSON.stringify(userPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.pantrylist);
      this.setState({ pantryItems: data.pantrylist })
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
    fetch('api/pantry', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(newItem => {
        console.log(newItem);
        let pantryItems = [...this.state.pantryItems];
        pantryItems.push(newItem);
        this.setState({ pantryItems });
      })
      .catch(err);
    this.setState({ value: '' });
  };

  deleteItem = (_id, err) => {
    let payload = {
      user: this.props.user,
      itemId: _id
    };
    fetch('api/pantry', {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(success => {
      console.log(success);
      this.setState(state => ({
        pantryItems: state.pantryItems.filter(item => item._id !== _id)
      }));
    })
    .catch(err);
  };

  pantrySearch = (e, err) => {
    e.preventDefault();
    let { pantrySelections, pantryCheckbox } = this.state;
    let searchData = { ingredients: pantrySelections.toString() };
    console.log(searchData);
    fetch('api/recipe-search', {
      method: 'POST',
      body: JSON.stringify(searchData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({ searchResults: results })
      })
      .catch(err);
      console.log(pantryCheckbox);
    // Clear all checkboxes
  };

  handleTick = (event) => {
    let target = event.target;
    let pantrySelections = [...this.state.pantrySelections];
    let checkStatus = {
      pantryItem: target.value,
      checked: target.checked
    };
    if(target.checked) {
      console.log(target.checked);
      pantrySelections.push(target.value);
      this.setState({ pantrySelections });
      console.log(pantrySelections);

      // Track PantryItem's checked status in state
      let pantryCheckbox = { ...this.state.pantryCheckbox };
      pantryCheckbox[target.id] = checkStatus;
      this.setState({ pantryCheckbox });

    } if (!target.checked) {
      console.log(target.checked);
      // Remove the target.value from pantrySelections
      pantrySelections = pantrySelections.filter(name => name !== target.value);
      console.log(pantrySelections);
      this.setState({ pantrySelections });

      // Track PantryItem's checked status in state
      let pantryCheckbox = { ...this.state.pantryCheckbox };
      pantryCheckbox[target.id].checked = target.checked;
      this.setState({ pantryCheckbox });
    }
  };

  render() {
    const { pantryItems } = this.state;
    const { searchResults } = this.state;
    return (
      <div className="pantrylist">
        <DashNav
          user={this.props.user}
          logOutUser={this.props.logOutUser}
        />
        <Container>
          <Jumbotron>
            <h3>Pantry List</h3>
            <Form inline onSubmit={this.addItem}>
              <FormGroup>
                <Label for="newPantryItem"></Label>
                <Input
                  type="text"
                  name="item"
                  id="newPantryItem"
                  placeholder="Add new pantry item"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <Button type="submit">
                  Add Item
                </Button>
              </FormGroup>
            </Form>
            <br />
            <Form onSubmit={this.pantrySearch}>
              <ListGroup>
                <FormGroup check>
                  {pantryItems.map(({ _id, name, quantity, unitOm }) => (
                    <ListGroupItem key={_id}>
                      <Label check>
                        <Input
                          addon
                          type="checkbox"
                          id={_id}
                          name="pantryIng"
                          value={name}
                          onChange={this.handleTick}
                        />
                        {' '} {quantity} {unitOm} of {name}
                      </Label>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        style={{float: "right"}}
                        onClick={this.deleteItem.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    </ListGroupItem>
                  ))}
                  <br />
                  <Button type="submit">Get Recipes</Button>
                </FormGroup>
              </ListGroup>
            </Form>
            <br />
            <CardDeck>
              {searchResults.map(({ id, title, image }) => (
                <Card key={id}>
                  <CardImg top width="100%" src={image} />
                  <CardBody>
                    <CardTitle>{title}</CardTitle>
                  </CardBody>
                </Card>
              ))}
            </CardDeck>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default PantryList;