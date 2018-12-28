import { combineReducers } from 'redux';
import step1 from './answers/step1-reducer';
import step2 from './answers/step2-reducer';
import step3 from './answers/step3-reducer';
import step4 from './answers/step4-reducer';
import personalize from './answers/personalize-reducer';

const answerReducers = combineReducers({
    step1,
    step2,
    step3,
    step4,
    personalize
});

export default answerReducers;
