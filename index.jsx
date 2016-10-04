/* eslint-env browser */
import React from 'react';
import defcard from './lib/defcard';
import Markdown from './lib/components/Markdown';

const MENU = [];
const NS_TO_MENU_MAP = []; /* Keeps a basic mapping of namespace to menu title for easy retrieval */

const state = {
  topLevelTitle: null,
  pageTitle: null,
  currentlyInGroup: false,
};

function setState(param, value) {
  state[param] = value;
}

function createTopLevelMenuItem(title) {
  MENU[title] = {
    inGroup: state.currentlyInGroup,
    children: [],
  };
}

function generateCardId() {
  const pageId = state.topLevelTitle.replace(/\W/g, '-').toLowerCase();
  const id = `${pageId}-${MENU[state.topLevelTitle].children[state.pageTitle].length}`;
  return id;
}

function addGroupToMenu(groupName) {
  createTopLevelMenuItem(groupName);
}

function addCardToMenu(component, id) {
  MENU[state.topLevelTitle].children[state.pageTitle].push({
    id,
    fn: () => component,
  });
}

function addPageToMenu(title) {
  // page without a group
  if (!state.currentlyInGroup) {
    setState('topLevelTitle', title);
    createTopLevelMenuItem(title);
  }
  MENU[state.topLevelTitle].children[title] = [];
  NS_TO_MENU_MAP[title] = state.topLevelTitle;
}

 /* external functions used to create menu */

export function registerGroup(groupName, renderPages) {
  setState('topLevelTitle', groupName);
  setState('currentlyInGroup', true);
  addGroupToMenu(groupName);
  renderPages();
  setState('currentlyInGroup', false);
}


export function registerPage(title) {
  setState('pageTitle', title);
  if (state.currentlyInGroup && title in MENU) {
    throw new Error(`You have a group and page both named ${title}!`);
  }

  addPageToMenu(title);
}

export function registerCard(cardOrFunction) {
  if (!state.topLevelTitle) {
    throw new Error('No namespace or group defined');
  }

  let component = cardOrFunction;
  const id = generateCardId();
  if (typeof cardOrFunction === 'function') {
    component = cardOrFunction(id);
  }

  addCardToMenu(component, id);
}

/* Functions to access information about created menu */

export function getMenu() {
  return MENU;
}

function getTopLevelMenuTitleForPage(pageTitle) {
  return NS_TO_MENU_MAP[pageTitle];
}

export function getCardsForPage(pageTitle) {
  const menuTitle = getTopLevelMenuTitleForPage(pageTitle);
  return MENU[menuTitle].children[pageTitle];
}

export function getTopLevelMenuTitles() {
  return Object.keys(MENU);
}

export function getPagesForTopLevelMenuTitle(title) {
  return MENU[title].children;
}

export function getPageTitlesForTopLevelMenuTitle(title) {
  return Object.keys(MENU[title].children);
}

export function isInGroup(topLevelTitle) {
  return MENU[topLevelTitle].inGroup;
}

export {
  registerPage as page,
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
