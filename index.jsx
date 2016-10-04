import React from 'react';
import { registerCard, registerPage, registerGroup } from './init';
import defcard from './lib/defcard';
import Markdown from './lib/components/Markdown';

export {
  registerPage as page,
  registerCard,
  registerGroup as group,
};

export function card(...args) {
  registerCard(id => defcard(id, ...args));
}

export function md(str) {
  return <Markdown text={typeof str === 'string' ? str : str.join('\n')} />;
}

export function text(documentation) {
  card(null, md([documentation]), null, {}, { heading: false });
}
