import React from 'react';
import { render } from 'react-dom';
import './assets/spectre.min.css';
import './index.css';
import Root from './components/Root';
import unregister from './registerServiceWorker';
import { generate } from './actions';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

var reducer = combineReducers(reducers);
var store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(generate());

render(<Root store={ store } />, document.getElementById('root'));

// Don't use the service worker, and moreover, destroy its caches, fuck you very
// much.
unregister();
caches.keys().then((names) => {
  for (let name of names) {
    caches.delete(name)
  }
})
