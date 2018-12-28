export const SET_RENT_PAYLOAD = 'SET_RENT_PAYLOAD';
export const RESET_RENT = 'RESET_RENT';
export const SET_ANNUAL_INCREASE = 'SET_ANNUAL_INCREASE';

export function setRentPayload(payload, state) {
    let round = state.nav.round;
    let step4 = state.answers.step4;
    let newPayload = {};
    Object.keys(payload).forEach((key) => {
        step4[key][round] = payload[key];
        newPayload[key] = step4[key];
    });
    return {
        type: SET_RENT_PAYLOAD,
        payload: newPayload
    };
}

export const makeRentArr = (initialRent, leaseLength, fixedIncrease, annualIncreaseType, leaseMeasurement, rentableArea) => {
    let arr = [];
    if (!fixedIncrease) {
        fixedIncrease = 0;
    }
    if (leaseMeasurement === 'unit') {
        initialRent = initialRent * rentableArea;
    }
    for (let i = 0; i < leaseLength; i++) {
        if (annualIncreaseType === 'percentage') {
            arr[i] = Number((Number(initialRent) * Math.pow(1 + (Number(fixedIncrease) / 100), i)).toFixed(2));
        } else if (annualIncreaseType === 'unit') {
            arr[i] = Number(Number(initialRent) + i * Number(fixedIncrease) * Number(rentableArea).toFixed(2));
            arr[i] = Math.round(arr[i] * 100) / 100;
        } else {
            arr[i] = Number((Number(initialRent) + i * Number(fixedIncrease)).toFixed(2));
        }
    }
    return arr;
};

export function setInitialRent(initialRent, shouldSetRentArr = true) {
    return (dispatch, getState) => {
        let round = getState().nav.round;
        let leaseLength = getState().answers.step2.leaseTerm[round];
        let rentableArea = getState().answers.step3.rentableArea[round];
        let step4 = getState().answers.step4;
        if (shouldSetRentArr) {
            dispatch(setRentPayload({
                initialRent: initialRent,
                rentArr: makeRentArr(initialRent, leaseLength, step4.fixedIncrease[round], step4.annualIncreaseType[round], step4.leaseMeasurement[round], rentableArea)
            }, getState()));
        } else {
            dispatch(setRentPayload({
                initialRent: initialRent,
            }, getState()));
        }
    };
}

export function setFixedIncrease(fixedIncrease) {
    return (dispatch, getState) => {
        let round = getState().nav.round;
        let leaseLength = getState().answers.step2.leaseTerm[round];
        let rentableArea = getState().answers.step3.rentableArea[round];
        let step4 = getState().answers.step4;
        dispatch(setRentPayload({
            fixedIncrease: fixedIncrease,
            rentArr: makeRentArr(step4.initialRent[round], leaseLength, fixedIncrease, step4.annualIncreaseType[round], step4.leaseMeasurement[round], rentableArea)
        }, getState()));
    };
}


export function setAnnualIncrease(annualIncrease) {
    return (dispatch, getState) => {
        let round = getState().nav.round;
        let leaseLength = getState().answers.step2.leaseTerm[round];
        let rentableArea = getState().answers.step3.rentableArea[round];
        let step4 = getState().answers.step4;
        let fixedIncrease = annualIncrease === 'fixed' ? step4.fixedIncrease[round] : 0;
        dispatch(setRentPayload({
            annualIncrease: annualIncrease,
            fixedIncrease: fixedIncrease,
            rentArr: makeRentArr(step4.initialRent[round], leaseLength, fixedIncrease, step4.annualIncreaseType[round], step4.leaseMeasurement[round], rentableArea)
        }, getState()));
    };
}

export function setAnnualIncreaseType(annualIncreaseType) {
    return (dispatch, getState) => {
        let round = getState().nav.round;
        let leaseLength = getState().answers.step2.leaseTerm[round];
        let rentableArea = getState().answers.step3.rentableArea[round];
        let step4 = getState().answers.step4;
        dispatch(setRentPayload({
            annualIncreaseType: annualIncreaseType,
            rentArr: makeRentArr(step4.initialRent[round], leaseLength, step4.fixedIncrease[round], annualIncreaseType, step4.leaseMeasurement[round], rentableArea)
        }, getState()));
    };
}

export function setRentArr(rentArr, keepIncreaseType) {
    return (dispatch, getState) => {
        let round = getState().nav.round;
        let annualIncrease = keepIncreaseType ? getState().answers.step4.annualIncrease[round] : 'variable';
        dispatch(setRentPayload({
            rentArr: rentArr,
            annualIncrease: annualIncrease
        }, getState()));
    };
}

export function resetRent() {
    return {
        type: RESET_RENT
    };
}

export function setLeaseMeasurement(leaseMeasurement) {
    return (dispatch, getState) => {
        let round = getState().nav.round;
        let leaseLength = getState().answers.step2.leaseTerm[round];
        let rentableArea = getState().answers.step3.rentableArea[round];
        let fixedIncrease = 0;
        let annualIncrease = 'no';
        let annualIncreaseType = 'percentage';
        let initialRent = 0;
        dispatch(setRentPayload({
            initialRent: initialRent,
            leaseMeasurement: leaseMeasurement,
            annualIncrease: annualIncrease,
            fixedIncrease: fixedIncrease,
            annualIncreaseType: annualIncreaseType,
            terminationFee: 0,
            rentArr: makeRentArr(initialRent, leaseLength, fixedIncrease, annualIncreaseType, leaseMeasurement, rentableArea),
        }, getState()));
    };
}

export function adjustRentArr(leaseLength, keepIncreaseType) {
    return (dispatch, getState) => {
        let step4 = getState().answers.step4;
        let round = getState().nav.round;
        let increaseType = step4.annualIncrease[round];
        let rentArr = step4.rentArr[round];
        let last = rentArr[rentArr.length - 1];
        let diff = leaseLength - rentArr.length;
        let rentableArea = getState().answers.step3.rentableArea[round];
        if (rentArr.length && rentArr.length !== leaseLength) {
            if (rentArr.length > leaseLength) {
                rentArr = rentArr.slice(0, leaseLength);
            } else {
                if (increaseType === 'fixed') {
                    rentArr = makeRentArr(step4.initialRent[round], leaseLength, step4.fixedIncrease[round], step4.annualIncreaseType[round], step4.leaseMeasurement[round], rentableArea);
                } else {
                    for (let i = 0; i < diff; i++) {
                        rentArr.push(last);
                    }
                }
            }
            dispatch(setRentArr(rentArr, keepIncreaseType));
        }
    };
}

export function setBorrowingRate(borrowRate) {
    return (dispatch, getState) => {
        dispatch(setRentPayload({
            borrowRate: borrowRate,
        }, getState()));
    };
}

export function setTerminationFee(terminationFee) {
    return (dispatch, getState) => {
        dispatch(setRentPayload({
            terminationFee: terminationFee,
        }, getState()));
    };
}
