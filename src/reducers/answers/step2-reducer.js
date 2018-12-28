'use strict';
import { SET_LEASE_PAYLOAD } from '../../actions/steps/step2-actions';

function step2(state = {
    'leaseLength': [1, 1],
    'terminationOption': [false, false],
    'terminationExercised': [false, false],
    'termYear': [1, 1],
    'renewOption': [false, false],
    'renewOptionNumber': [1, 1],
    'renew1': [0, 0],
    'renew2': [0, 0],
    'renew1Max': [19, 19],
    'renew2Max': [19, 19],
    'renewSwitch1': [false, false],
    'renewSwitch2': [false, false],
    'leaseTerm': [1, 1]
}, action) {
    let { type, payload } = action;
    switch (type) {
        case SET_LEASE_PAYLOAD:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default step2;