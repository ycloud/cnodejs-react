import store from './redux/store'
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import './index.css';

injectTapEventPlugin();
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App}/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
