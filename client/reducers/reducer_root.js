import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CounterReducer from './reducer_counter.js';

const rootReducer = combineReducers({
    forn: formReducer,
    counter: CounterReducer
});

export default rootReducer;