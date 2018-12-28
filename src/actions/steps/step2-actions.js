import { adjustRentArr } from './step4-actions';
export const SET_LEASE_PAYLOAD = 'SET_LEASE_PAYLOAD';

export function setLeasePayload(payload, state) {
    let round = state.nav.round;
    let step2 = state.answers.step2;
    let newPayload = {};
    Object.keys(payload).forEach((key) => {
        step2[key][round] = payload[key];
        newPayload[key] = step2[key];
    });
    return {
        type: SET_LEASE_PAYLOAD,
        payload: newPayload
    };
}

function calculateLeaseTerm(leaseLength, terminationExercised, renewOption, termYear, renewSwitch1, renewSwitch2, renew1, renew2) {
    let total;
    if (terminationExercised) {
        return Number(termYear);
    } else if (renewOption && renewSwitch1) {
        if (!renewSwitch2) {
            total = Number(leaseLength) + Number(renew1);
            return total > 20 ? 20 : total;
        } else {
            total = Number(leaseLength) + Number(renew1) + Number(renew2);
            return total > 20 ? 20 : total;
        }
    } else {
        return Number(leaseLength);
    }
}

function calculateRenew1Max(leaseLength) {
    let total = 20;
    total -= leaseLength;
    return total > 0 ? total : 0;
}

function calculateRenew2Max(leaseLength, renew1) {
    let total = 20;
    total -= leaseLength;
    total -= renew1;
    return total > 0 ? total : 0;
}


export function setLeaseLength(leaseLength) {
    return (dispatch, getState) => {
        let state = getState();
        let step2 = state.answers.step2;
        let round = getState().nav.round;
        let termYear = leaseLength < step2.termYear[round] ? leaseLength : step2.termYear[round];
        let leaseTerm = calculateLeaseTerm(leaseLength, step2.terminationExercised[round], step2.renewOption[round], termYear, step2.renewSwitch1[round], step2.renewSwitch2[round], step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            leaseLength: Number(leaseLength),
            termYear: termYear,
            renew1Max: calculateRenew1Max(leaseLength),
            renew2Max: calculateRenew2Max(leaseLength, step2.renew1[round]),
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setTerminationOption(terminationOption) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let terminationExercised = false;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], terminationExercised, step2.renewOption[round], step2.termYear[round], step2.renewSwitch1[round], step2.renewSwitch2[round], step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            terminationOption: terminationOption,
            terminationExercised: terminationExercised,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setTerminationExercised(terminationExercised) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let termYear = terminationExercised ? 1 : 0;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], terminationExercised, step2.renewOption[round], termYear, step2.renewSwitch1[round], step2.renewSwitch2[round], step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            terminationExercised: terminationExercised,
            termYear: termYear,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setTermYear(termYear) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], step2.renewOption[round], termYear, step2.renewSwitch1[round], step2.renewSwitch2[round], step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            termYear: termYear,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setRenewOption(renewOption) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], renewOption, step2.termYear[round], step2.renewSwitch1[round], step2.renewSwitch2[round], step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            renew1: 0,
            renew2: 0,
            renewOption: renewOption,
            renewSwitch1: false,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setRenewOptionNumber(renewOptionNumber) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let renewSwitch1 = step2.renewSwitch1[round];
        let renewSwitch2 = false;
        let renew2 = 0;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], step2.renewOption[round], step2.termYear[round], renewSwitch1, renewSwitch2, step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            renewOptionNumber: renewOptionNumber,
            renewSwitch1: renewSwitch1,
            renew2: renew2,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setRenew1(renew1) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], step2.renewOption[round], step2.termYear[round], step2.renewSwitch1[round], step2.renewSwitch2[round], renew1, step2.renew2[round]);
        dispatch(setLeasePayload({
            renew1: renew1,
            renew1Max: calculateRenew1Max(step2.leaseLength[round]),
            renew2Max: calculateRenew2Max(step2.leaseLength[round], renew1),
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setRenew2(renew2) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], step2.renewOption[round], step2.termYear[round], step2.renewSwitch1[round], step2.renewSwitch2[round], step2.renew1[round], renew2);
        dispatch(setLeasePayload({
            renew2: renew2,
            renew1Max: calculateRenew1Max(step2.leaseLength[round]),
            renew2Max: calculateRenew2Max(step2.leaseLength[round], step2.renew1[round]),
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setRenewSwitch1(renewSwitch1) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], step2.renewOption[round], step2.termYear[round], renewSwitch1, step2.renewSwitch2[round], step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            renewSwitch1: renewSwitch1,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}

export function setRenewSwitch2(renewSwitch2) {
    return (dispatch, getState) => {
        let state = getState();
        let round = getState().nav.round;
        let step2 = state.answers.step2;
        let leaseTerm = calculateLeaseTerm(step2.leaseLength[round], step2.terminationExercised[round], step2.renewOption[round], step2.termYear[round], step2.renewSwitch1[round], renewSwitch2, step2.renew1[round], step2.renew2[round]);
        dispatch(setLeasePayload({
            renewSwitch2: renewSwitch2,
            leaseTerm: leaseTerm
        }, state));
        dispatch(adjustRentArr(leaseTerm, true));
    };
}
