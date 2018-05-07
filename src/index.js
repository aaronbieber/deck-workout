import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

var reducer = combineReducers(reducers);
var store = createStore(reducer);

render(<Root store={ store } />, document.getElementById('root'));
registerServiceWorker();
