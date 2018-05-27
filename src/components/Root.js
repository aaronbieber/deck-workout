import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VisibleDeckWorkout from '../containers/VisibleDeckWorkout';
import VisibleExercises from '../containers/VisibleExercises';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={VisibleDeckWorkout} />
          <Route path="/exercises" component={VisibleExercises} />
        </div>
      </Router>
    </Provider>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired
// };

export default Root;
