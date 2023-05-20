import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DeckWorkout from '../components/DeckWorkout'
import Settings from './Settings'
import Help from '../components/Help'

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={DeckWorkout} />
            <Route path="/settings" component={Settings} />
            <Route path="/help" component={Help} />
            <Route path="/:seed" component={DeckWorkout} />
          </Switch>
        </div>
      </Router>
    </Provider>
);

export default Root;
