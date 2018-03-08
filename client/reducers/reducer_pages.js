import {SEARCH_RETURNED, DELETE_PAGE} from '../actions/index.js';

export default function(state = null, action) {
    switch(action.type) {
        case (SEARCH_RETURNED):
            return action.payload.data;
        case (DELETE_PAGE):
            return null;
        default:
            return state;
    }

    return state;
}