import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DeckWorkout from './DeckWorkout';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={DeckWorkout} />
      </Router>
    </Provider>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired
// };

export default Root;
