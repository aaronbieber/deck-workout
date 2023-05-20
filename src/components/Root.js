import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DeckWorkout from '../components/DeckWorkout'
import Settings from './Settings'
import Help from '../components/Help'

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<DeckWorkout/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/help" element={<Help/>} />
            <Route path="/:seed" element={<DeckWorkout/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
);

export default Root;
