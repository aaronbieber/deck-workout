import React, { Component } from 'react';
import Card from './components/Card';
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';
import './App.css';

var reducer = combineReducers(reducers);
var store = createStore(
    reducer
);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
        </Provider>
    );
  }
}

export default App;

store.dispatch();
