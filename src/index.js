import {
  init,
  pushPath,
  popPath,
  registerCard,
} from './core';
import { buildCard } from './Card';
import { buildMarkdown } from './Markdown';
import DefaultTheme from './DefaultTheme';
import _StateRecorder from './StateRecorder';

// -- core

let state = init();
let isInNs = false;

export function reset() {
  state = init();
}

export function cards() {
  return state.cards;
}

export function card(...args) {
  state = registerCard(() => buildCard(...args), state);
}

export function group(name, fn) {
  if (isInNs) {
    state = popPath(state);
    isInNs = false;
  }
  state = pushPath(name, state);

  fn();

  if (isInNs) {
    state = popPath(state);
    isInNs = false;
  }
  state = popPath(state);
}

export function ns(name) {
  if (isInNs) {
    state = popPath(state);
  }
  state = pushPath(name, state);
  isInNs = true;
}

export function md(str) {
  return buildMarkdown(str);
}

export const StateRecorder = _StateRecorder;
export default DefaultTheme;
