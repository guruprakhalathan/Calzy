import { operatingOldLease, financeNewLease, operatingNewLease } from '../services/calculator';
export const SET_RESULT_PAYLOAD = 'SET_RESULT_PAYLOAD';
import { setRound, setRoundCompleted } from '../actions/nav-actions';
import { sendPayload as sendStep1 } from '../actions/steps/step1-actions';
import { setLeasePayload as sendStep2 } from '../actions/steps/step2-actions';
import { setPayload as sendStep3 } from '../actions/steps/step3-actions';
import { setRentPayload as sendStep4, setBorrowingRate } from '../actions/steps/step4-actions';
import { setResultTab } from '../actions/nav-actions';
export const SHOW_PRINT_PAGE = 'SHOW_PRINT_PAGE';

function setResultPayload(payload, state) {
    let round = state.nav.round;
    let results = state.results;
    let newPayload = {};
    Object.keys(payload).forEach((key) => {
        results[key][round] = payload[key];
        newPayload[key] = results[key];
    });
    return {
        type: SET_RESULT_PAYLOAD,
        payload: newPayload
    };
}

const fillArray = (n, offset = 0) => {
    return Array.from(new Array(n), (val, index) => index + offset);
};

function getTotalRowData(result, tableOrder) {
    return tableOrder.map((value) => {
        if (value === 'eoyBalanceRightOfUseAsset' || value === 'eoyBalanceLeaseLiability') {
            return null;
        } else if (value === 'years') {
            return 'Total';
        } else {
            return result[value].length ? result[value].reduce((prev, next) => {
                return prev + next;
            }) : null;
        }
    });
}

function getInitialRow(result, tableOrder) {
    return tableOrder.map((key) => {
        if (key === 'eoyBalanceRightOfUseAsset' || key === 'eoyBalanceLeaseLiability') {
            return result['presentValueOfRent'];
        } else if (key === 'years') {
            return 'Initial';
        } else {
            return null;
        }
    });
}

export const setTableResult = () => {
    return (dispatch, getState) => {
        let state = getState();
        let round = state.nav.round;
        let step1 = state.answers.step1;
        let step2 = state.answers.step2;
        let step4 = state.answers.step4;
        let lps = step1.lps[round];
        let existOrNew = step1.existOrNew[round];
        let isAnyTrue = step1.scenariosAnswers[round].some((v) => { return v; });
        let leaseTerm = state.answers.step2.leaseTerm[round];
        let rentArr = step4.rentArr[round];
        rentArr = rentArr.map((rent) => {
            return Number(rent);
        });
        let borrowRate = step4.borrowRate[round] / 100;
        let result = [];
        let tableOrder;
        let includeTermination = (step2['terminationOption'][round] && step2['terminationExercised'][round]);
        let terminationFee = step4['terminationFee'][round];
        if (includeTermination) {
            rentArr[rentArr.length - 1] += Number(terminationFee);
        }
        if (existOrNew === 'Existing' && !isAnyTrue) {
            result = operatingOldLease(rentArr, leaseTerm);
            tableOrder = ['years', 'annualRent', 'straightLineRentExpense', 'deferredRent', 'cumulativeDeferredRent'];
        } else if (lps === 'U.S. GAAP' && !isAnyTrue) {
            result = operatingNewLease(rentArr, leaseTerm, borrowRate);
            tableOrder = ['years', 'annualRent', 'eoyBalanceRightOfUseAsset', 'eoyBalanceLeaseLiability', 'straightLineRentExpense'];
        } else {
            result = financeNewLease(rentArr, leaseTerm, borrowRate);
            tableOrder = ['years', 'annualRent', 'eoyBalanceRightOfUseAsset', 'eoyBalanceLeaseLiability', 'interestExpense', 'amortizationExpense', 'totalExpense'];
        }
        result['years'] = fillArray(leaseTerm, 1);
        result['annualRent'] = rentArr;
        let totalRowData = getTotalRowData(result, tableOrder);
        let initialRow = getInitialRow(result, tableOrder);
        dispatch(setResultPayload({
            tableValues: result,
            tableOrder: tableOrder,
            totalRowData: totalRowData,
            initialRow: initialRow
        }, state));
        dispatch(setResultTab(0));
    };
};


function getPayload(step) {
    let payload = {};
    Object.keys(step).forEach((key) => {
        if (Array.isArray(step[key])) {
            if (Array.isArray(step[key][0])) {
                payload[key] = step[key][0].slice();
            } else {
                payload[key] = step[key][0];
            }
        }
    });
    return payload;
}

export const copyLease = () => {
    return (dispatch, getState) => {
        dispatch(setRound(1));
        dispatch(setRoundCompleted(2));
        let state = getState();
        dispatch(sendStep1(getPayload(state.answers.step1), state));
        dispatch(sendStep2(getPayload(state.answers.step2), state));
        dispatch(sendStep3(getPayload(state.answers.step3), state));
        dispatch(sendStep4(getPayload(state.answers.step4), state));
        dispatch(setBorrowingRate(state.answers.step4.borrowRate[0]));
        window.location.href = '#setup/1';
    };
};

export const showPrintPage = (showPrint) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            resolve(dispatch({
                type: SHOW_PRINT_PAGE,
                payload: {
                    showPrint: showPrint
                }
            }));
        });
    };
};
