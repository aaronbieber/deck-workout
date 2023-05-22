import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import Root from './components/Root';
import unregister from './registerServiceWorker';

import appReducer from './reducers/app';
import timerReducer from './reducers/timer'
import workoutReducer from './reducers/workout';

import './assets/spectre.min.css';
import './index.css';
import { generate } from './reducers/workout';

const store = configureStore({
  reducer: {
    app: appReducer,
    timer: timerReducer,
    workout: workoutReducer
  }
})
store.dispatch(generate())

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<Root store={store} />)

// Don't use the service worker, and moreover, destroy its caches, fuck you very
// much.
unregister();
caches.keys().then((names) => {
  for (let name of names) {
    caches.delete(name)
  }
})
