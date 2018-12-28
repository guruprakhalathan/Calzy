import { LOAD_STEPS, SET_STEP, SET_MAX_STEP, ROUTE_VIEW, SET_ROUND, SET_ROUND_COMPLETE, SET_RESULT_TAB } from '../actions/nav-actions';
function navReducer(state = {
    steps: [],
    step: 0,
    maxStep: 0,
    round: 0,
    page: '#landing-page',
    completedRound: 0,
    resultTab: 0
}, action) {
    let { payload } = action;
    switch (action.type) {
        case LOAD_STEPS:
            return Object.assign({}, state, {
                steps: action.steps[state.round]
            });
        case SET_STEP:
            return Object.assign({}, state, {
                step: action.step ? action.step : 0
            });
        case SET_MAX_STEP:
            return Object.assign({}, state, {
                maxStep: action.maxStep > state.maxStep ? action.maxStep : state.maxStep
            });
        case ROUTE_VIEW:
            return Object.assign({}, state, {
                page: action.page
            });
        case SET_ROUND:
            return Object.assign({}, state, payload);
        case SET_ROUND_COMPLETE:
            return Object.assign({}, state, payload);
        case SET_RESULT_TAB:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default navReducer;