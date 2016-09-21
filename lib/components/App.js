import React, { PropTypes } from 'react';
import Navigation from './Navigation';
import '../styles.css';

export default function App(props) {
  const { cards, children, location } = props;
  return (
    <div className="md-flex sans-serif" style={{ minHeight: '100vh' }}>
      <div className="col-12 md-col-2 border-box">
        <Navigation cards={cards} location={location} />
      </div>
      <div className="col-12 md-col-10 border-box">
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  cards: PropTypes.any.isRequired,
  children: PropTypes.node,
  location: PropTypes.object,
  params: PropTypes.shape({
    ns: PropTypes.string,
  }).isRequired,
};
