'use strict';
import React from 'react';
import StepTitle from '../step-title';
import Question from '../../../components/setup/questions';

import { setLeaseCurrency, setLeaseUnit, setRentableArea, setTripleNet, setReimbursement } from '../../../actions/steps/step3-actions';
import { commaFormat, stripNonNumeric } from '../../../services/formatter';

class Step3 extends React.Component {
    componentDidMount() {
        $('[data-toggle="tooltip"]').popover();
    }
    componentDidUpdate() {
        $('[data-toggle="tooltip"]').popover();
    }

    render() {
        let props = this.props;
        let questions = props.questions.steps ? props.questions.steps[props.nav.step] : null;
        let answers = props.answers ? props.answers.step3 : null;
        let round = props.nav.round;
        let nav = props.nav;
        let otherRound = round === 0 ? 1 : 0;

        const changeValue = (fn, e) => {
            let value = e.target.value;
            props.dispatch(fn(value));
        };

        const changeSwitch = (fn, e) => {
            let checked = e.target.checked;
            props.dispatch(fn(checked));
        };

        const rentChange = (fn, e) => {
            let value = Number(stripNonNumeric(e.target.value));
            props.dispatch(fn(value));
        };

        const getUnit = (unit) => {
            if (unit === 'sqft') {
                return <span className="measurement">Sq. Ft.</span>;
            } else {
                return <span className="measurement">Sq. M.</span>;
            }
        };

        if (questions && answers) {
            return (
                <div className="step col-xs-12">
                    <StepTitle
                        title={questions['step-title']}
                        round={round}
                        completedRound={nav.completedRound}
                        projectName={props.answers.personalize.projectName}
                    />
                    <Question
                        id="lease-currency"
                        qObj={questions['lease-currency']}
                        onChange={changeValue.bind(null, setLeaseCurrency)}
                        answerValue={answers['currency'][round]}
                        prevAnswer={answers['currency'][otherRound]}
                        completedRound={nav.completedRound}
                    />
                    <Question
                        id="lease-unit-measurement"
                        qObj={questions['lease-unit-measurement']}
                        onChange={changeValue.bind(null, setLeaseUnit)}
                        answerValue={answers['unit'][round]}
                        prevAnswer={answers['unit'][otherRound]}
                        completedRound={nav.completedRound}
                    />
                    <Question
                        id = "rentable-area"
                        qObj = { questions['rentable-area'] }
                        answerValue = { answers['rentableArea'][round] }
                        onChange = { rentChange.bind(null, setRentableArea) }
                        afterComp = {getUnit(answers['unit'][round])}
                        prevAnswer={answers['rentableArea'][otherRound]}
                        completedRound={nav.completedRound}
                        formatter={commaFormat}
                        placeholder={0}
                    />
                    <Question
                        id = "triple-net"
                        qObj = { questions['triple-net'] }
                        answerValue = { answers['tripleNet'][round] }
                        onChange = { changeSwitch.bind(null, setTripleNet) }
                        prevAnswer={answers['tripleNet'][otherRound]}
                        completedRound={nav.completedRound}
                    />
                    {answers['tripleNet'][round] &&
                       <div className="col-xs-12 nopadding">
                            <p className="col-xs-6">
                                For purposes of determining the amount to be recorded on a lessee’s balance sheet, any portion of the rent associated with reimbursing the lessor for operating expenses (not including real estate taxes and insurance) can be excluded from the balance sheet calculation. See <a href="./glossary.html#lease-details" target="_blank"><strong>Reference Guide</strong></a> for further details.
                            </p>
                        </div>
                    }
                    <Question
                        id = "include-reimbursement"
                        qObj = { questions['include-reimbursement'] }
                        answerValue = { answers['includeReimbursement'][round] }
                        onChange = { changeSwitch.bind(null, setReimbursement) }
                        prevAnswer={ answers['includeReimbursement'][otherRound] }
                        completedRound={nav.completedRound}
                    />
                    {answers['includeReimbursement'][round] &&
                        <p className="include-reimbursement col-xs-6">
                            If the amounts reimbursed to the lessor for real estate taxes and/or insurance are determined to be “Variable Lease Payments,” meaning they fluctuate from year-to-year (e.g., in the U.S. this would be the case in a triple-net lease), they are to be excluded from the rent amount entered in the next section.  If any portion of or all of the real estate taxes and/or insurance amounts are fixed (e.g., in the U.S. this may be the case in a lease with a base year), then the fixed portion must be included with the rent amount entered in the next section. See <a href="./glossary.html#lease-details" target="_blank"><strong>Reference Guide</strong></a> for further details.
                        </p>
                    }
                </div>
            );
        }
        return (<div></div>);
    }
}

export default Step3;