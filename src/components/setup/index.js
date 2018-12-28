'use strict';
import React from 'react';
import StepIndicator from './step-indicator';
import SetupButtons from './setup-buttons';
import Step1 from './steps/step-1.js';
import Step2 from './steps/step-2.js';
import Step3 from './steps/step-3.js';
import Step4 from './steps/step-4.js';

const getStepComponent = (props, steps) => {
    switch (steps) {
        case 0:
            return <Step1 {...props} />;
        case 1:
            return <Step2 {...props} />;
        case 2:
            return <Step3 {...props} />;
        case 3:
            return <Step4 {...props} />;
        default:
            return <Step1 {...props} />;
    }
};

const Setup = (props) => {
    return (
        <div className="col-xs-12 nopadding">
            <div id="setup-container" className="col-xs-12">
                <StepIndicator {...props} />
                {getStepComponent(props, props.nav.step)}
            </div>
            <SetupButtons {...props} />
        </div>
    );
};

export default Setup;