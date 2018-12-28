import { SET_LEASE_DETAIL_PAYLOAD } from '../../actions/steps/step3-actions';

function step3(state = {
    currency: ['USD - United States Dollar ($)', 'USD - United States Dollar ($)'],
    unit: ['sqft', 'sqft'],
    rentableArea: [null, null],
    tripleNet: [false, false],
    includeReimbursement: [false, false]
}, actions) {
    let { type, payload } = actions;
    switch (type) {
        case SET_LEASE_DETAIL_PAYLOAD:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default step3;
