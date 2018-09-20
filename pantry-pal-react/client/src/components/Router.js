import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import App from './App';
import PantryList from './PantryList';
import RecipeSearch from './RecipeSearch';
import GroceryList from './GroceryList';
// import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/user/:id/grocerylist" component={GroceryList} />
      <Route path="/user/:id/pantrylist" component={PantryList} />
      <Route path="/user/:id/recipesearch" component={RecipeSearch} />
      <Route path="/user/:id" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;