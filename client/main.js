import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer_root.js';

import Home from './components/Home.js';
import AddValue from './containers/AddValue.js';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware()(createStore);
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <BrowserRouter>
        <Switch>
          <Route path="/AddValue" component={AddValue} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ Provider>,
    document.getElementById('root')
  );
});