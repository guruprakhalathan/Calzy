'use strict';
import React from 'react';
import NextPrevButton from '../../components/common/next-prev-button';
import { setMaxStep, getResults, setRoundCompleted } from '../../actions/nav-actions';

const SetupButtons = (props) => {
    const steps = props.nav.steps;
    const step = props.nav.step;
    const maxStep = props.nav.maxStep;
    const completedRound = props.nav.completedRound;

    const result = () => {
        window.location.hash = '#result-page';
        props.dispatch(getResults());
    };

    const next = () => {
        const nextStep = step + 1;
        if (nextStep > steps.length - 2) {
            if (completedRound === 0) {
                props.dispatch(setRoundCompleted(1));
            }
            props.dispatch(setMaxStep(nextStep));
            result();
        } else {
            window.location.hash = '#setup/' + (nextStep + 1);
            if (maxStep < nextStep) {
                props.dispatch(setMaxStep(nextStep));
            }
        }
    };

    const prev = () => {
        const prevStep = step - 1;
        if (prevStep >= 0) {
            window.location.hash = '#setup/' + (prevStep + 1);
        }
    };

    return (
        <div className="setup-buttons col-xs-12">
            {completedRound === 1 &&
                <NextPrevButton className="return-result" text="Finish Editing" onClick={result}/>
            }
            {completedRound === 2 &&
                <NextPrevButton className="return-result" text="Compare Leases" onClick={result}/>
            }
            <NextPrevButton className="previous" isActive={step > 0} text="Previous" onClick={prev}/>
            <NextPrevButton className="next" isActive text={step === steps.length - 2 ? 'View Results' : 'Next'} onClick={next} />
        </div>
    );
};

export default SetupButtons;