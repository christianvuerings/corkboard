/* eslint-env browser */

import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './lib/components/App';
import Page from './lib/components/Page';
import { getMenu } from './init';

const connect = (state, Component) => props => (
  <Component {...state} {...props} />
);


const menu = getMenu();
// const cards = getCardsForPage(ns);

const ConnectedApp = connect({ menu }, App);
const ConnectedPage = connect({ menu }, Page);

const routes = (
  <Route component={ConnectedApp} path="/">
    <IndexRoute component={ConnectedPage} />
    <Route
      component={ConnectedPage}
      path="/:title"
    />
  </Route>
);

const node = document.createElement('DIV');
document.body.appendChild(node);

render(
  <Router history={hashHistory}>{routes}</Router>,
  node
);
