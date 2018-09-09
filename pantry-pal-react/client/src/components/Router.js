import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import App from './App';
// import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/user/:id" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;