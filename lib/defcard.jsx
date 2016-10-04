import React, { isValidElement } from 'react';
import Card from './components/Card';

export function parseArgs(args) {
  let name;
  let parts = [];
  let options = Card.defaultProps.options;
  let i = 0;

  if (typeof args[0] === 'string') {
    [name] = args;
    i += 1;
  }

  while (i < args.length && (isValidElement(args[i]) || typeof args[i] !== 'object')) {
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
    name,
    parts,
    options,
  };
}

export default function defcard(id, ...args) {
  return <Card {...parseArgs(args)} id={id} />;
}
