export const ROUTE_VIEW = 'ROUTE_VIEW';
export const SET_STEP = 'SET_STEP';
export const LOAD_STEPS = 'LOAD_STEPS';
export const SET_MAX_STEP = 'SET_MAX_STEP';
export const SET_ROUND = 'SET_ROUND';
export const SET_ROUND_COMPLETE = 'SET_ROUND_COMPLETE';
export const SET_RESULT_TAB = 'SET_RESULT_TAB';

import { setTableResult } from '../actions/result-actions';

export function loadSteps() {
    return (dispatch) => {
        return $.getJSON('contents/nav.json').then((steps) => {
            return dispatch({
                type: LOAD_STEPS,
                steps
            });
        });
    };
}

export function setStep(step) {
    return {
        type: SET_STEP,
        step
    };
}

export function setMaxStep(maxStep) {
    return {
        type: SET_MAX_STEP,
        maxStep
    };
}

export function getResults() {
    return (dispatch, getState) => {
        dispatch({
            type: ROUTE_VIEW,
            page: '#result-page'
        });
    };
}

export function setRound(round) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_ROUND,
            payload: {
                round: round
            }
        });
    };
}

export function setRoundCompleted(completedRound) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_ROUND_COMPLETE,
            payload: {
                completedRound: completedRound
            }
        });
    };
}

export function setResultTab(resultTab) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_RESULT_TAB,
            payload: {
                resultTab: resultTab
            }
        });
    };
}

export function routeView(hash) {
    hash = hash.split('?')[0];
    let hashArr = hash ? hash.split('/') : null;
    let page = hashArr ? hashArr.length ? hashArr[0] : null : null;
    let step = hashArr ? hashArr[1] ? hashArr[1] - 1 : 0 : 0;
    return (dispatch) => {
        switch (page) {
            case '#setup':
                dispatch(setStep(step));
                dispatch(setMaxStep(step));
                dispatch({
                    type: ROUTE_VIEW,
                    page
                });
                break;
            case '#result-page':
                dispatch(setTableResult());
                dispatch({
                    type: ROUTE_VIEW,
                    page: '#result-page'
                });
                break;
            case '#tool-overview':
                dispatch({
                    type: ROUTE_VIEW,
                    page: '#tool-overview'
                });
                break;
            default:
                dispatch({
                    type: ROUTE_VIEW,
                    page: '#landing-page'
                });
        }
    };
}