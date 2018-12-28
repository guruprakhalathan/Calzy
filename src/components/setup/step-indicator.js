'use strict';
import React from 'react';

const Step = ({ isComplete, isActive, isCurrentStep, isLessThanCurrentStep, step, title, isLastStep }) => {
    const stepIcon = (isComplete, isCurrentStep, step) => {
        return (isComplete && !isCurrentStep) ?
                <svg><use xlinkHref="./assets/svg/icons.svg#icon-ok" /></svg>
                : step;
    };
    const getListClassName = () => {
        let className = 'step' + step + ' ';
        if (isComplete) { className += 'is-complete '; }
        if (isActive) { className += 'is-active '; }
        if (isLessThanCurrentStep) { className += 'is-less-step'; }
        return className;
    };
    const href = isActive ? (isLastStep ? '#result-page/' : '#setup/' + step) : null;
    return (
        <a href={href} tabIndex="-1">
            <li className={getListClassName()}>
                <span className="flow__step">
                    {stepIcon(isComplete, isCurrentStep, step)}
                </span>
                { title }
            </li>
        </a>
    );
};

const StepIndicator = (props) => {
    let steps = props.nav.steps;
    let step = props.nav.step;
    let maxStep = props.nav.maxStep;
    return (
        <div className="flow-wrapper">
            <ul className="flow">
                {steps.length && steps.map((title, idx) => {
                    return (
                        <Step
                            key={idx}
                            isActive={idx <= maxStep}
                            isComplete={idx <= maxStep}
                            // isCurrentStep= {idx === step}
                            isLessThanCurrentStep = {idx < step}
                            step={idx + 1}
                            title={title}
                            isLastStep={idx === (steps.length - 1)}
                        />
                    );
                })}
            </ul>
            <hr/>
        </div>
    );
};

export default StepIndicator;