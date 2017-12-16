import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PagesReducer from './reducer_pages.js';
import SinglePageReducer from './reducer_single_page.js';

const rootReducer = combineReducers({
    form: formReducer,
    pages: PagesReducer,
    singlePage: SinglePageReducer
});

export default rootReducer;