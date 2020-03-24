import React from 'react';
import { render } from 'react-dom';
import './assets/spectre.min.css';
import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import { generate, recoverSession } from './actions';
import { drawAll } from './actions';
import observer from './utils/observer';
import { handleSave } from './observers';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

var reducer = combineReducers(reducers);
var store = createStore(reducer, applyMiddleware(thunk, observer(handleSave)));

render(<Root store={ store } />, document.getElementById('root'));
registerServiceWorker();
store.dispatch(generate());
store.dispatch(recoverSession());

//store.dispatch(drawAll());
