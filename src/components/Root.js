import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VisibleDeckWorkout from '../containers/VisibleDeckWorkout';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={VisibleDeckWorkout} />
      </Router>
    </Provider>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired
// };

export default Root;
