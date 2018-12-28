import { SET_STANDARD_PAYLOAD } from '../../actions/steps/step1-actions.js';

function step1(state = {
    'lps': ['U.S. GAAP', 'U.S. GAAP'],
    'existOrNew': ['New', 'New'],
    'scenarioNumber': [0, 0],
    'scenariosAnswers': [[false, false, false, false, false], [false, false, false, false, false]],
    'classification': ['Operating Lease', 'Operating Lease']
}, action) {
    let { type, payload } = action;
    switch (type) {
        case SET_STANDARD_PAYLOAD:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default step1;