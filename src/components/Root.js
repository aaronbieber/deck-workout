import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VisibleDeckWorkout from '../containers/VisibleDeckWorkout';
import VisibleSettings from '../containers/VisibleSettings';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={VisibleDeckWorkout} />
          <Route path="/settings" component={VisibleSettings} />
        </div>
      </Router>
    </Provider>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired
// };

export default Root;
