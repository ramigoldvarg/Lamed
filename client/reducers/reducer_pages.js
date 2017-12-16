import {SEARCH_RETURNED} from '../actions/index.js';

export default function(state = null, action) {
    switch(action.type) {
        case (SEARCH_RETURNED):
            return action.payload.data;
        default:
            return state;
    }

    return state;
}