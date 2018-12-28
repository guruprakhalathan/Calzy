import { SET_PERSONALIZED_PAYLOAD } from '../../actions/personalize-actions';

function personalize(state = {
    projectName: ['Lease #1', 'Lease #2'],
    preparedBy: '',
    preparedFor: '',
}, action) {
    let { type, payload } = action;
    switch (type) {
        case SET_PERSONALIZED_PAYLOAD:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default personalize;