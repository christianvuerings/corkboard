// -- data

export function init() {
  return {
    path: [],
    position: [0],
    cards: [],
  };
}

function incPosition(state) {
  return {
    ...state,
    position: [
      ...state.position.slice(0, -1),
      state.position[state.position.length - 1] + 1,
    ],
  };
}

export function pushPath(path, state) {
  return {
    ...state,
    path: [...state.path, path],
    position: [
      ...state.position,
      0,
    ],
  };
}

export function popPath(state) {
  // Can't pop if we're already at the root
  if (state.path.length === 0) {
    return { ...state };
  }
  return incPosition({
    ...state,
    path: state.path.slice(0, -1),
    position: state.position.slice(0, -1),
  });
}

export function registerCard(fn, state) {
  const card = {
    fn,
    path: state.path,
    position: state.position,
  };

  return incPosition({
    ...state,
    cards: [...state.cards, card],
  });
}
