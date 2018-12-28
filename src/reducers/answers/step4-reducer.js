import { SET_RENT_PAYLOAD, RESET_RENT } from '../../actions/steps/step4-actions';

function step4(state = {
    initialRent: [0, 0],
    fixedIncrease: [0, 0],
    fixedIncreaseType: ['percentage', 'percentage'],
    rentArr: [[0], [0]],
    annualIncrease: ['no', 'no'],
    annualIncreaseType: ['percentage', 'percentage'],
    leaseMeasurement: ['total', 'total'],
    borrowRate: [0, 0],
    terminationFee: [0, 0]
}, action) {
    let { type, payload } = action;
    switch (type) {
        case SET_RENT_PAYLOAD:
            return Object.assign({}, state, payload);
        case RESET_RENT:
            return Object.assign({}, state, {
                fixedIncrease: 0,
                rentArr: []
            });
        default:
            return state;
    }
}

export default step4;