/* eslint react/no-unused-prop-types: 0 */
import React, { PropTypes } from 'react';
import { getCardsForPage } from '../../index';

export default function Page(props) {
  const { params: { title } } = props;

  if (!title) {
    return <div />;
  }

  const cards = getCardsForPage(title);

  return (
    cards ? <div className="p2">
      {cards.map((card, i) =>
        <div className="mb4" id={`card-${i}`} key={i}>{card.fn()}</div>
       )}
    </div>
    : <div div className="p2">
      <h1 className="mt0 mb6 display-l dark-gray">Oops!<br />This page could not be found.</h1>
    </div>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
