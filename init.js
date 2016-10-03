/* eslint-env browser */

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

function addCardToMenu(card, id) {
  MENU[state.topLevelTitle].children[state.pageTitle].push({
    id,
    fn: () => card,
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
    console.warn(`You have a group and page both named ${title}!`);
  }

  addPageToMenu(title);
}

export function registerCard(cardOrFunction) {
  if (!state.topLevelTitle) {
    throw new Error('No namespace or group defined');
  }

  let card = cardOrFunction;
  const id = generateCardId();
  if (typeof cardOrFunction === 'function') {
    card = cardOrFunction(id);
  }

  addCardToMenu(card, id);
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
