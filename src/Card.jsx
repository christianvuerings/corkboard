import { merge, style } from 'glamor';
import React, { PropTypes, isValidElement } from 'react';

const nameStyle = style({
  marginTop: 0,
  paddingTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #CCC',
  fontSize: 36,
  lineHeight: 1.2,
});

const cardStyle = style({
  paddingTop: '1rem',
  paddingBottom: '1rem',
  marginLeft: '-1rem',
  marginRight: '-1rem',
});

const panelStyle = style({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  boxSizing: 'border-box',
  flex: '1 0 0',
});

export default function Card(props) {
  const {
    name,
    parts,
    stacked,
  } = props;


  return (
    <div>
      {name && <h2 className={nameStyle}>{name}</h2>}
      <div className={merge(cardStyle, style({ '@media(min-width:480px)': { display: (!stacked ? 'flex' : 'block') } }))}>
        {parts.map((node, i) => (
          <div className={panelStyle} key={i}>
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.node,
  parts: PropTypes.arrayOf(PropTypes.node).isRequired,
  stacked: PropTypes.bool.isRequired,
};

Card.defaultProps = {
  stacked: false,
};

export function parseArgs(args) {
  let name;
  let parts = [];
  let options = Card.defaultProps;
  let i = 0;

  if (typeof args[0] === 'string') {
    [name] = args;
    i += 1;
  }

  while (i < args.length && isValidElement(args[i])) {
    parts = [...parts, args[i]];
    i += 1;
  }

  if (i < args.length) {
    options = {
      ...options,
      ...args[i],
    };
    i += 1;
  }

  return {
    ...options,
    name,
    parts,
  };
}

export function buildCard(...args) {
  return <Card {...parseArgs(args)} />;
}
