import {SINGLE_PAGE, DELETE_PAGE, UPDATE_DOCUMENT} from '../actions/index.js';

export default function (state = null, action) {
    switch(action.type) {
        case(SINGLE_PAGE):
            return action.payload.data;
        case (DELETE_PAGE):
            return null;
        case (UPDATE_DOCUMENT):
            return action.payload.data;
        default:
            break;
    }
    return state;
}