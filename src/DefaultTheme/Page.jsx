import { merge, style } from 'glamor';
import React, { PropTypes } from 'react';
import { sansSerif } from './styles';

const pageStyle = merge(
  sansSerif,
  style({
    paddingLeft: '1rem',
    paddingRight: '1rem',
  }));

export default function Page(props) {
  const { cards } = props;
  const title = props.params.title;

  if (!title) {
    return <div />;
  }

  const pageCards = cards.filter(
    card => card.path[card.path.length - 1] === title
  );

  return (
    pageCards ? <div className={pageStyle}>
      {pageCards.map((card, i) =>
        <div className="mb4" id={`card-${i}`} key={i}>{card.fn()}</div>
       )}
    </div>
    : <div div className="p2">
      <h1 className="mt0 mb6 display-l dark-gray">Oops!<br />This page could not be found.</h1>
    </div>
  );
}

Page.propTypes = {
  /* @chrislloyd */
  /* eslint-disable react/forbid-prop-types */
  cards: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  params: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
