import React, { PropTypes } from 'react';
import {
  Router,
  hashHistory,
  Route,
  IndexRoute,
} from 'react-router';
import App from './App';
import Page from './Page';

export default function DefaultTheme({ cards, name }) {
  const connect = (s, Component) => props => (
    <Component {...s} {...props} />
  );

  const ConnectedApp = connect({ cards, name }, App);
  const ConnectedPage = connect({ cards }, Page);

  return (
    <Router history={hashHistory}>
      <Route component={ConnectedApp} path="/">
        <IndexRoute component={ConnectedPage} />
        <Route
          component={ConnectedPage}
          path="/:title"
        />
      </Route>
    </Router>
  );
}

DefaultTheme.propTypes = {
  name: PropTypes.string,
  /* @chrislloyd */
  /* eslint-disable react/forbid-prop-types */
  cards: PropTypes.any.isRequired,
  /* eslint-enable react/forbid-prop-types */
};
