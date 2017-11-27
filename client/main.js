import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer_root.js';
import Counter from './containers/counter.js';

import { HashRouter, Route, Switch, Link } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
  render() {
    return (
    <div> 
      hello
      <Link to="/counter">
        counter
      </Link>
    </div>);
  }
}
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <HashRouter>
        <Switch>
          <Route path="/counter" component={Counter} />
          <Route path="/" component={Hello} />
        </Switch>
      </HashRouter>
    </ Provider>,
    document.getElementById('root')
  );
});