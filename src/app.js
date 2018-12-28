import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app.container';
import prototypeStore from './stores/prototypeStore';

const store = prototypeStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
