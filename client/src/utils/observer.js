const isStrictlyEqual = (obj1, obj2) => obj1 === obj2;

/**
 * Observer middleware factory.
 *
 * @param {Function} onUpdate Callback to trigger when state is changed.
 * @param {Object} [options] Configuration options
 * @param {Function} [options.compareWith] Predicate function for comparison
 * @returns {Function}
 */
export default function observerMiddleware(onUpdate, options = {}) {
  const pred = options.compareWith || isStrictlyEqual;

  return store => next => action => {
    const prevState = store.getState();
    const returnValue = next(action);
    const nextState = store.getState();

    if (!pred(nextState, prevState)) {
      onUpdate(store.dispatch, nextState, prevState);
    }

    return returnValue;
  };
}
