import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer_root.js';

import Home from './components/Home.js';
import AddValue from './containers/AddValue.js';
import Editor from './containers/Editor.js';

import { HashRouter, Route, Switch, Link } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware()(createStore);
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <HashRouter>
        <Switch>
          <Route path="/AddValue" component={AddValue} />
          <Route path = "/tiny" component={Editor} />
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    </ Provider>,
    document.getElementById('root')
  );
});