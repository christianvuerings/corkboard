import React, { PropTypes } from 'react';

export default function CardPage(props) {
  const { cards: allCards, params: { ns } } = props;

  if (Object.keys(allCards).length === 0 || !ns) {
    return <div />;
  }

  const cards = allCards[ns];
  return (
    cards ? <div className="p2">
      {cards.map((card, i) =>
        <div className="mb4" id={`card-${i}`} key={i}>{card.fn()}</div>
       )}
    </div>
    : <div div className="p2">
      <h1 className="mt0 mb6 display-l dark-gray">Oops!<br/>This page could not be found.</h1>
    </div>
  );
}

CardPage.propTypes = {
  cards: PropTypes.any.isRequired,
  params: PropTypes.shape({
    ns: PropTypes.string,
  }).isRequired,
};
