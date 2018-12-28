'use strict';
import React from 'react';
import StepTitle from '../step-title';
import Question from '../../../components/setup/questions';
import { setInitialRent, setFixedIncrease, setAnnualIncrease, setAnnualIncreaseType, setLeaseMeasurement, setBorrowingRate, setTerminationFee } from '../../../actions/steps/step4-actions';
import { commaFormat, moneyFormat, formatMoney, getCurrency } from '../../../services/formatter';

import Radio from '../../../components/common/radio';
import Tooltip from '../../../components/common/tooltip';

import RentTable from '../../../components/setup/steps/rent-table';

class Step4 extends React.Component {
    componentDidMount() {
        $('[data-toggle="tooltip"]').popover();
    }
    componentDidUpdate() {
        $('[data-toggle="tooltip"]').popover();
    }

    render() {
        let props = this.props;
        let questions = props.questions.steps ? props.questions.steps[props.nav.step] : null;
        let answers = props.answers ? props.answers.step4 : null;
        let step3 = props.answers ? props.answers.step3 : null;
        let step2 = props.answers ? props.answers.step2 : null;
        let round = props.nav.round;
        let nav = props.nav;
        let otherRound = round === 0 ? 1 : 0;
        let currency = getCurrency(step3.currency[round]);
        let otherCurrency = getCurrency(step3.currency[otherRound]);

        const changeInitialRentValue = (fn, e) => {
            let value = e.target.value;
            props.dispatch(fn(value));
        };

        const changeMoneyValue = (fn, isInt = false, e) => {
            let value = formatMoney(e.target.value, isInt);
            if (!value) {
                props.dispatch(fn(0));
            } else {
                props.dispatch(fn(value));
            }
        };

        const annualIncreaseTypeAfterComp = () => {
            let type = answers.annualIncreaseType[round];
            let unit = step3.unit[round] === 'sqft' ? ' per Sq. Ft.' : ' per Sq. M.';
            if (type === 'percentage') {
                return ' %';
            } else if (type === 'unit') {
                return unit;
            }
            return '';
        };

        const previousInformation = () => {
            let leaseTerm = step2['leaseTerm'][round];
            let otherLeaseTerm = step2['leaseTerm'][otherRound];
            let rentableArea = step3['rentableArea'][round] ? step3['rentableArea'][round] : 0;
            let otherRentableArea = step3['rentableArea'][otherRound];
            return (
                <div className="col-xs-12 nopadding row-margin">
                    <div className="col-xs-12 nopadding">
                        <p className="col-xs-12 col-md-6">{questions['lease-term-text']}</p>
                        <p className="col-xs-6 col-md-3">{leaseTerm + (leaseTerm > 1 ? ' Years' : ' Year')}</p>
                        {nav.completedRound === 2 &&
                            <div>
                                <p className="col-xs-4 col-md-2 other-input">{otherLeaseTerm + (otherLeaseTerm > 1 ? ' Years' : ' Year')}</p>
                                <p className="col-xs-2 col-md-1">{leaseTerm !== otherLeaseTerm &&
                                    <div className="changed-circle"></div>
                                }</p>
                            </div>
                        }
                    </div>
                    <div className="col-xs-12 nopadding row-margin">
                        <p className="col-xs-12 col-md-6">{questions['rentable-text']}</p>
                        <p className="col-xs-6 col-md-3">{commaFormat(rentableArea) + (step3['unit'][round] === 'sqft' ? ' Square Feet' : ' Square Meters') }</p>
                        {nav.completedRound === 2 &&
                            <div>
                                <p className="col-xs-4 col-md-2 other-input">{commaFormat(otherRentableArea) + (step3['unit'][otherRound] === 'sqft' ? ' Square Feet' : ' Square Meters') }</p>
                                <p className="col-xs-2 col-md-1">{rentableArea !== otherRentableArea || step3['unit'][round] !== step3['unit'][otherRound] &&
                                    <div className="changed-circle"></div>
                                }</p>
                            </div>
                        }
                    </div>
                </div>
            );
        };

        const leaseMeasurementType = () => {
            let measurementOption = [{ 'id': 'total', 'text': 'By total amount per year' },
            { 'id': 'unit', 'text': step3['unit'][round] === 'sqft' ? 'By per square foot per year' : 'By per square meter per year' }];
            return (
                <div className="col-xs-12 nopadding">
                    <div className="col-xs-12 col-md-6">
                        <p className="question-text">{questions['lease-measurement-question-text']}</p>
                        <Tooltip tooltip={'how-to-input-rent'} />
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <Radio
                            groupName="lease-measurement"
                            selected={answers['leaseMeasurement'][round]}
                            options={measurementOption}
                            onChange={changeInitialRentValue.bind(null, setLeaseMeasurement)}
                        />
                    </div>
                    <div className="col-xs-4 col-md-2 other-input">
                        {nav.completedRound === 2 &&
                            <p>{ measurementOption.find((v) => { return v.id === answers['leaseMeasurement'][otherRound]; }).text }</p>
                        }
                        </div>
                        <div className="col-xs-2 col-md-1">
                            {nav.completedRound === 2 && answers['leaseMeasurement'][otherRound] !== answers['leaseMeasurement'][round] &&
                                <div className="changed-circle"></div>
                            }
                        </div>
                </div>
            );
        };

        const getAnnualTypeText = (type) => {
            if (type === 'percentage') {
                return 'Annual percentage increase';
            } else if (type === 'unit') {
                return 'Annual increase per square foot/meter';
            } else if (type === 'dollar') {
                return 'Specific dollar increase each year';
            } else {
                return '';
            }
        };

        const getFixIncreaseTextIdx = (type) => {
            if (type === 'dollar') {
                return 2;
            } else if (type === 'unit') {
                return 1;
            } else {
                return 0;
            }
        };

        const getPercentageFormat = (x) => {
            return x ? x.toFixed(2) + '%' : '';
        };

        if (questions && answers) {
            let annualIncrease = answers['annualIncrease'][round];
            let initialRentText = (!step3['tripleNet'][round] && !step3['includeReimbursement'][round]) ?
                'Please input the first year’s rent here. Based on the answers to your questions in the Lease Details section, it appears that you should enter the rent to be paid without making any adjustments.' :
                'Please input first year’s rent here. Based on the answers to your questions in the Lease Details section, it appears that you should make adjustments to the rent to be paid.  See reference guide for more details.';
            let includeTermination = (step2['terminationOption'][round] && step2['terminationExercised'][round]);
            let includeTerminationOtherRound = (step2['terminationOption'][otherRound] && step2['terminationExercised'][otherRound]);
            return (
                <div className="step step-4 col-xs-12 nopadding">
                    <StepTitle
                        title={questions['step-title']}
                        round={round}
                        completedRound={nav.completedRound}
                        projectName={props.answers.personalize.projectName}
                    />
                    {previousInformation()}
                    <Question
                        id = "incremental-borrow-rate"
                        qObj = { questions['incremental-borrow-rate'] }
                        answerValue = { answers['borrowRate'][round] === 0 ? null : answers['borrowRate'][round] }
                        onChange = { changeMoneyValue.bind(null, setBorrowingRate, false)}
                        afterComp = {<span> % </span>}
                        formatter={(x) => { return answers['borrowRate'][round] ? x.toFixed(2) : x; }}
                        prevAnswer={answers['borrowRate'][otherRound]}
                        completedRound={nav.completedRound}
                        placeholder={'0'}
                        moneyInput
                        tooltip={'discount-borrowing-rate'}
                    />
                    {leaseMeasurementType()}
                    <Question
                        id = "initial-rent"
                        text = {`${initialRentText}`}
                        qObj = { questions['initial-rent'] }
                        answerValue = { answers['initialRent'][round] }
                        onChange = { answers.leaseMeasurement[round] === 'unit' ? changeMoneyValue.bind(null, setInitialRent, false) : changeMoneyValue.bind(null, setInitialRent, true) }
                        prevAnswer={answers['initialRent'][otherRound]}
                        completedRound={nav.completedRound}
                        formatter={moneyFormat.bind(null, {
                            currency: currency,
                            decimal: true,
                        })}
                        otherFormatter={moneyFormat.bind(null, {
                            currency: otherCurrency,
                            decimal: true,
                        })}
                        placeholder={ currency + (answers.leaseMeasurement[round] === 'unit' ? '0.00' : '0')}
                        moneyInput={answers.leaseMeasurement[round] === 'unit'}
                        tooltip={'rent-amount'}
                        disabled={annualIncrease === 'variable'}
                    />
                    <Question
                        id = "annual-increase"
                        qObj = { questions['annual-increase'] }
                        answerValue = {answers['annualIncrease'][round]}
                        onChange = {changeInitialRentValue.bind(null, setAnnualIncrease)}
                        prevAnswer={answers['annualIncrease'][otherRound]}
                        completedRound={nav.completedRound}
                        tooltip={'increases'}
                    />
                    {annualIncrease === 'variable' &&
                        <p className="col-xs-6 right">{questions['annual-increase-variable-note']}</p>
                    }
                    {annualIncrease === 'fixed' &&
                        <Question
                            id = "annual-increase-type"
                            qObj = {questions['annual-increase-type']}
                            answerValue = {answers['annualIncreaseType'][round]}
                            onChange = {changeInitialRentValue.bind(null, setAnnualIncreaseType)}
                            prevAnswer={answers['annualIncrease'][otherRound] === 'fixed' ? answers['annualIncreaseType'][otherRound] : null}
                            prevAnswerFormat={getAnnualTypeText}
                            completedRound={nav.completedRound}
                        />
                    }
                    {annualIncrease === 'fixed' &&
                        <Question
                            id = "fixed-increase"
                            qObj = { questions['fixed-increase'] }
                            answerValue = { answers['fixedIncrease'][round] }
                            onChange = { changeMoneyValue.bind(null, setFixedIncrease, false) }
                            prevAnswer={ answers['annualIncrease'][otherRound] === 'fixed' ? answers['fixedIncrease'][otherRound] : null}
                            completedRound={nav.completedRound}
                            afterComp={annualIncreaseTypeAfterComp()}
                            formatter={answers['annualIncreaseType'][round] !== 'percentage' ? moneyFormat.bind(null, {
                                currency: currency,
                                decimal: true,
                            }) : (x) => { return x.toFixed(2); }}
                            otherFormatter={answers['annualIncreaseType'][otherRound] !== 'percentage' ? moneyFormat.bind(null, {
                                currency: otherCurrency,
                                decimal: true,
                            }) : getPercentageFormat}
                            placeholder={answers['annualIncreaseType'][round] !== 'percentage' ? currency + '0' : '0' }
                            moneyInput
                            textIdx = { getFixIncreaseTextIdx(answers['annualIncreaseType'][round])}
                        />
                    }
                    {answers['initialRent'][round] !== null && answers['annualIncrease'][round] === 'variable' &&
                        <div className="col-xs-12 nopadding">
                            <p className="col-xs-12">{questions['variable-increase-text']}</p>
                        </div>
                    }
                    {includeTermination &&
                        <Question
                            id="termination-fee"
                            qObj={ questions['termination-fee']}
                            answerValue={answers['terminationFee'][round]}
                            onChange = { answers.leaseMeasurement[round] === 'unit' ? changeMoneyValue.bind(null, setTerminationFee, false) : changeMoneyValue.bind(null, setTerminationFee, true) }
                            prevAnswer={answers['terminationFee'][otherRound]}
                            formatter={moneyFormat.bind(null, {
                                currency: currency,
                                decimal: true,
                            })}
                            otherFormatter={moneyFormat.bind(null, {
                                currency: otherCurrency,
                                decimal: true,
                            })}
                            completedRound={nav.completedRound}
                            placeholder={ currency + (answers.leaseMeasurement[round] === 'unit' ? '0.00' : '0')}
                            moneyInput={answers.leaseMeasurement[round] === 'unit'}
                        />
                    }
                    {answers['initialRent'][round] !== null &&
                        <div className="col-xs-12 nopadding">
                            <div className="col-xs-12 col-md-4 rent-title">
                                <p className="question-text"><b>{questions['annual-rent-title-text']}</b></p>
                            </div>
                            <div className="col-xs-12 col-md-5 rent-table nopadding">
                                <RentTable
                                    answers={answers}
                                    isUnit={answers['leaseMeasurement'][round] === 'unit'}
                                    step3={step3}
                                    round={round}
                                    unit={step3['unit'][round]}
                                    area={step3['rentableArea'][round]}
                                    rentArr={answers['rentArr'][round]}
                                    dispatch={props.dispatch}
                                    includeTermination={includeTermination}
                                    terminationFee={Number(answers['terminationFee'][round])}
                                    currency={getCurrency(step3.currency[round])}
                                />
                            </div>
                            <div className="col-xs-12 col-md-3 other-rent-table nopadding">
                                {nav.completedRound === 2 &&
                                    <RentTable
                                        answers={answers}
                                        isUnit={answers['leaseMeasurement'][otherRound] === 'unit'}
                                        step3={step3}
                                        round={round}
                                        unit={step3['unit'][otherRound]}
                                        area={step3['rentableArea'][otherRound]}
                                        rentArr={answers['rentArr'][otherRound]}
                                        dispatch={props.dispatch}
                                        includeTermination={includeTerminationOtherRound}
                                        terminationFee={Number(answers['terminationFee'][otherRound])}
                                        currency={getCurrency(step3.currency[otherRound])}
                                        disabled
                                    />
                                }
                            </div>
                        </div>
                    }
                    {(includeTermination || includeTerminationOtherRound) &&
                        <div className="col-xs-12 nopadding">
                            <p className="termination-text">* includes termination fee</p>
                        </div>
                    }
                </div>
            );
        }
        return (<div></div>);
    }
}

export default Step4;
