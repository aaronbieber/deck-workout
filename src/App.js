import React, { Component } from 'react';
import DeckWorkout from './components/DeckWorkout';
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
        <DeckWorkout />
    );
  }
}

export default App;

// This is how you do your init thing
// store.dispatch();
