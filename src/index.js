import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import Root from './components/Root';
import unregister from './registerServiceWorker';

import app from './reducers/app';
import timer from './reducers/timer'
import workout from './reducers/workout'

import './assets/spectre.min.css';
import './index.css';
import { generate } from './actions';

const store = configureStore({
  reducer: {
    app,
    timer,
    workout
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
