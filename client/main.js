import React from 'react';
import ReactDOM from 'react-dom';

import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer_root.js';

import Home from './components/Home.js';
import AddDocument from './containers/AddDocument.js';
import Editor from './containers/Editor.js';
import Page from './containers/Page.js'

import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import EditDocument from './containers/EditDocument';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <HashRouter>
        <Switch>
          <Route path="/AddDocument" component={AddDocument} />
          <Route path = "/tiny" component={Editor} />
          <Route path = "/pages/:id/edit" component={EditDocument} />
          <Route path="/pages/:id" component={Page} />
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    </ Provider>,
    document.getElementById('root')
  );
});