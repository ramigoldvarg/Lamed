import {SINGLE_PAGE} from '../actions/index.js';

export default function (state = null, action) {
    switch(action.type) {
        case(SINGLE_PAGE):
            return action.payload.data;
        default:
            break;
    }
    return state;
}