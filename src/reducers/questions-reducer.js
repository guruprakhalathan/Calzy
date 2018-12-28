import { LOAD_ALL_QUESTIONS } from '../actions/questions-actions';

function questionReducer(state = {
    steps: null
}, action) {
    switch (action.type) {
        case LOAD_ALL_QUESTIONS:
            return Object.assign({}, state, {
                steps: action.steps
            });
        default:
            return state;
    }
}

export default questionReducer;