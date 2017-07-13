import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Timesheet from './containers/timesheet';
import store from './store';
import '../styles/main.scss';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Timesheet />
    </Provider>
  </div>,
  document.querySelector('.app'),
);
