import { SET_RESULT_PAYLOAD, SHOW_PRINT_PAGE } from '../actions/result-actions';

function resultsReducer(state = {
    tableValues: [null, null],
    tableOrder: [null, null],
    totalRowData: [null, null],
    initialRow: [null, null],
    showPrint: false,
}, action) {
    let { type, payload } = action;
    switch (type) {
        case SHOW_PRINT_PAGE:
        case SET_RESULT_PAYLOAD:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default resultsReducer;