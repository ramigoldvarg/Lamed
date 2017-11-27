import {INCREASED_COUNTER} from '../actions/index.js';

export default function(state = 0, action) {
    switch(action.type) {
        case (INCREASED_COUNTER):
            return state + 1;
    }

    return state;
}