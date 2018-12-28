
export const SET_LEASE_CURRENCY = 'SET_LEASE_CURRENCY';
export const SET_LEASE_UNIT = 'SET_LEASE_UNIT';
export const SET_RENTABLE_AREA = 'SET_RENTABLE_AREA';
export const SET_TRIPLE_NET = 'SET_TRIPLE_NET';
export const SET_LEASE_DETAIL_PAYLOAD = 'SET_LEASE_DETAIL_PAYLOAD';
import { makeRentArr, setRentPayload } from './step4-actions';

export function setPayload(payload, state) {
    let round = state.nav.round;
    let step3 = state.answers.step3;
    let newPayload = {};
    Object.keys(payload).forEach((key) => {
        step3[key][round] = payload[key];
        newPayload[key] = step3[key];
    });
    return {
        type: SET_LEASE_DETAIL_PAYLOAD,
        payload: newPayload
    };
}

export function setLeaseCurrency(currency) {
    return (dispatch, getState) => {
        dispatch(setPayload({
            currency: currency
        }, getState()));
    };
}

export function setLeaseUnit(unit) {
    return (dispatch, getState) => {
        dispatch(setPayload({
            unit: unit
        }, getState()));
    };
}

export function setRentableArea(rentableArea) {
    return (dispatch, getState) => {
        let step4 = getState().answers.step4;
        let round = getState().nav.round;
        let leaseLength = getState().answers.step2.leaseTerm[round];
        let rentArr = makeRentArr(step4.initialRent[round], leaseLength, step4.fixedIncrease[round], step4.annualIncreaseType[round], step4.leaseMeasurement[round], rentableArea);
        dispatch(setRentPayload({
            rentArr: rentArr
        }, getState()));
        dispatch(setPayload({
            rentableArea: rentableArea
        }, getState()));
    };
}

export function setTripleNet(tripleNet) {
    return (dispatch, getState) => {
        dispatch(setPayload({
            tripleNet: tripleNet
        }, getState()));
    };
}

export function setReimbursement(includeReimbursement) {
    return (dispatch, getState) => {
        dispatch(setPayload({
            includeReimbursement: includeReimbursement
        }, getState()));
    };
}