import { insertRule, style, merge } from 'glamor';
import React, { PropTypes } from 'react';
import Navigation from './Navigation';
import { sand, sansSerif } from './styles';

insertRule(`body { margin: 0; background-color: ${sand}; }`);
insertRule(`
  .Markdown { line-height: 1.5; }
  .Markdown h1,
  .Markdown h2,
  .Markdown h3,
  .Markdown h4,
  .Markdown h5,
  .Markdown h6 { line-height: 1.2; }
  .Markdown p { margin-top: 0; }
`);

const appStyle = style({
  minHeight: '100vh',
  '@media(min-width: 480px)': {
    display: 'flex',
  },
});

const navStyle = style({
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  boxShadow: '0 0 24px rgba(255,255,255,0.1)',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  '@media(min-width: 480px)': {
    width: `${(2 / 12) * 100}%`,
  },
});

const contentStyle = style({
  width: '100%',
  boxSizing: 'border-box',
  '@media(min-width: 480px)': {
    width: `${(10 / 12) * 100}%`,
  },
});

export default function App(props) {
  const { cards, children, location, name } = props;
  return (
    <div className={appStyle}>
      <div className={navStyle}>
        <h2 className={merge(sansSerif, style({ paddingLeft: '1rem', paddingRight: '1rem', marginTop: 0, marginBottom: '2rem', fontSize: 20, lineHeight: 1.2 }))}>{name}</h2>
        <Navigation name={name} cards={cards} location={location} />
      </div>
      <div className={contentStyle}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  name: PropTypes.string,
  /* @chrislloyd */
  /* eslint-disable react/forbid-prop-types */
  cards: PropTypes.any,
  location: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  children: PropTypes.node,
};
