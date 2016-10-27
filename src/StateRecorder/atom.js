/*
    synchronous copy of clojure's atom.

        https://clojuredocs.org/clojure.core/atom

*/
export default function (initialState) {
  let state = initialState;
  const listeners = [];

  const transition = (newState) => {
    state = newState;
    listeners.forEach(listener => listener(state));
  };

  return {
    deref: () => state,
    reset: val => transition(val),
    set: fn => transition(fn(state)),
    listen: listener => listeners.push(listener),
  };
}
