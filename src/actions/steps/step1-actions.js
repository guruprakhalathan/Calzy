export const SET_LEASE_STANDARD = 'SET_LEASE_STANDARD';
export const SET_NEW_OR_EXIST = 'SET_NEW_OR_EXIST';
export const SET_SCENARIO_ANSWERS = 'SET_SCENARIO_ANSWERS';
export const SET_STANDARD_PAYLOAD = 'SET_STANDARD_PAYLOAD';

import { setLeasePayload } from './step2-actions';
import { adjustRentArr } from './step4-actions';

export function sendPayload(payload, state) {
    let round = state.nav.round;
    let step1 = state.answers.step1;
    let newPayload = {};
    Object.keys(payload).forEach((key) => {
        step1[key][round] = payload[key];
        newPayload[key] = step1[key];
    });
    return {
        type: SET_STANDARD_PAYLOAD,
        payload: newPayload
    };
}

function determineScenarioNumber(lps, existOrNew) {
    if (lps === 'U.S. GAAP') {
        if (existOrNew === 'New') return 0;
        else if (existOrNew === 'Existing') return 1;
    } else if (lps === 'IFRS') {
        if (existOrNew === 'Existing') return 2;
        else if (existOrNew === 'New') return 3;
    }
}

function determineClassifcation(lps, existOrNew, scenariosAnswers) {
    let isAnyTrue = false;
    scenariosAnswers.forEach((a) => {
        if (a) {
            isAnyTrue = true;
        }
    });
    if (lps === 'U.S. GAAP' && existOrNew === 'New') {
        return isAnyTrue ? 'Finance Lease' : 'Operating Lease';
    } else if (lps === 'U.S. GAAP' && existOrNew === 'Existing') {
        return isAnyTrue ? 'Capital Lease' : 'Operating Lease';
    } else if (lps === 'IFRS' && existOrNew === 'Existing') {
        return isAnyTrue ? 'Finance Lease' : 'Operating Lease';
    } else {
        return 'Finance Lease';
    }
}

function updateLeaseTerm(existOrNew, classification, state, dispatch) {
    if (existOrNew === 'Existing' && classification === 'Operating Lease') {
        let round = state.nav.round;
        let leaseLength = state.answers.step2.leaseLength[round];
        dispatch(setLeasePayload({
            terminationOption: false,
            terminationExercised: false,
            termYear: 1,
            renewOption: false,
            renewOptionNumber: 1,
            renew1: 0,
            renew2: 0,
            renew1Max: 19,
            renew2Max: 19,
            renewSwitch1: true,
            renewSwitch2: true,
            leaseTerm: leaseLength
        }, state));
        dispatch(adjustRentArr(leaseLength, true));
    }
}

export function setLeaseStandard(lps) {
    return (dispatch, getState) => {
        let state = getState();
        let step1 = state.answers.step1;
        let round = state.nav.round;
        let classification = determineClassifcation(lps, step1.existOrNew[round], []);
        dispatch(sendPayload({
            lps: lps,
            scenarioNumber: determineScenarioNumber(lps, step1.existOrNew[round]),
            scenariosAnswers: [false, false, false, false, false],
            classification: classification
        }, state));
        updateLeaseTerm(step1.existOrNew[round], classification, state, dispatch);
    };
}

export function setExistOrNew(existOrNew) {
    return (dispatch, getState) => {
        let state = getState();
        let step1 = state.answers.step1;
        let round = state.nav.round;
        let classification = determineClassifcation(step1.lps[round], existOrNew, []);
        dispatch(sendPayload({
            existOrNew: existOrNew,
            scenarioNumber: determineScenarioNumber(step1.lps[round], existOrNew),
            scenariosAnswers: [false, false, false, false, false],
            classification: classification
        }, state));
        updateLeaseTerm(existOrNew, classification, state, dispatch);
    };
}


export function initScenarioAnswers(scenarios) {
    let initScenarioAnswers = scenarios.map((s) => {
        return false;
    });
    return {
        type: SET_SCENARIO_ANSWERS,
        payload: {
            scenariosAnswers: initScenarioAnswers
        }
    };
}

export function setScenariosAnswers(scenariosAnswers) {
    return (dispatch, getState) => {
        let state = getState();
        let step1 = state.answers.step1;
        let round = state.nav.round;
        let classification = determineClassifcation(step1.lps[round], step1.existOrNew[round], scenariosAnswers);
        dispatch(sendPayload({
            scenariosAnswers: scenariosAnswers,
            classification: classification
        }, state));
        updateLeaseTerm(step1.existOrNew[round], classification, state, dispatch);
    };
}