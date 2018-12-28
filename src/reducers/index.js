import { combineReducers } from 'redux';
import nav from './nav-reducer';
import questions from './questions-reducer';
import answers from './answers-reducer';
import results from './results-reducer';

const rootReducer = combineReducers({
    nav,
    questions,
    answers,
    results
});

export default rootReducer;
