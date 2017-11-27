import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer_root.js';
import Counter from './containers/counter.js';
import Home from './components/Home.js';

import { HashRouter, Route, Switch, Link } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware()(createStore);
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <HashRouter>
        <Switch>
          <Route path="/counter" component={Counter} />
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    </ Provider>,
    document.getElementById('root')
  );
});