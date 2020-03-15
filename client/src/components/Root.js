import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import VisibleDeckWorkout from '../containers/VisibleDeckWorkout'
import VisibleSettings from '../containers/VisibleSettings'
import Help from '../components/Help'
import 'whatwg-fetch'

class Root extends React.Component {
  componentDidMount() {
    console.log('yes i have mounted');
    fetch('/hello').then((res) => res.json()).then((json) => console.log(json));
  }

  render() {
    const {store} = this.props;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={VisibleDeckWorkout} />
            <Route path="/settings" component={VisibleSettings} />
            <Route path="/help" component={Help} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Root;
