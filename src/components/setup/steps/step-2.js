'use strict';
import React from 'react';
import StepTitle from '../step-title';
import Question from '../../../components/setup/questions';
import { setLeaseLength, setTerminationOption, setTerminationExercised, setTermYear, setRenewOption, setRenewOptionNumber, setRenew1, setRenew2, setRenewSwitch1, setRenewSwitch2 } from '../../../actions/steps/step2-actions';

const fillArray = (n, offset = 0) => {
    return Array.from(new Array(n), (val, index) => index + offset);
};

const getYearArr = (n, offset = 0, formatter) => {
    return fillArray(n, offset).map((i) => {
        return { id: i, text: formatter(i) };
    });
};

class Step2 extends React.Component {
    componentDidMount() {
        $('[data-toggle="tooltip"]').popover();
    }
    componentDidUpdate() {
        $('[data-toggle="tooltip"]').popover();
    }

    render() {
        let props = this.props;
        let questions = props.questions.steps ? props.questions.steps[props.nav.step] : null;
        let answers = props.answers ? props.answers.step2 : null;
        let step1 = props.answers ? props.answers.step1 : null;
        let round = props.nav.round;
        let nav = props.nav;
        let otherRound = round === 0 ? 1 : 0;

        const changeSelect = (fn, e) => {
            let value = e.target.value;
            props.dispatch(fn(value));
        };

        if (questions && answers && step1) {
            return (
                <div className="step col-xs-12">
                    <StepTitle
                        title={questions['step-title']}
                        round={round}
                        completedRound={nav.completedRound}
                        projectName={props.answers.personalize.projectName}
                    />
                    <Question
                        id="initial-lease-length"
                        qObj={questions['initial-lease-length']}
                        onChange={changeSelect.bind(null, setLeaseLength)}
                        answerValue={answers['leaseLength'][round]}
                        prevAnswer={answers['leaseLength'][otherRound]}
                        completedRound={nav.completedRound}
                        tooltip={'initial-lease-term'}
                    />
                    <LeaseTermOptions
                        props={props}
                        questions={questions}
                        answers={answers}
                        step1={step1}
                    />
                    <div className="col-xs-12 nopadding lease-term">
                        <div className="col-xs-12 col-md-6">
                            <p className="question-text">
                                {questions['lease-term']}
                            </p>
                        </div>
                        <p className="col-xs-6 col-md-3">
                            {answers['leaseTerm'][round]} {answers['leaseTerm'][round] > 1 ? 'Years' : 'Year'}
                        </p>
                        {nav.completedRound === 2 &&
                            <div>
                                <p className="col-xs-4 col-md-2 other-input">{answers['leaseTerm'][otherRound]} Years</p>
                                <p className="col-xs-2 col-md-1">{ answers['leaseTerm'][round] !== answers['leaseTerm'][otherRound] &&
                                    <div className="changed-circle"></div>
                                }</p>
                            </div>
                        }
                    </div>
                </div>
            );
        }
        return <div></div>;
    }
}

const LeaseTermOptions = ({ props, questions, answers, step1 }) => {
    let round = props.nav.round;
    const changeSwitch = (fn, e) => {
        let checked = e.target.checked;
        props.dispatch(fn(checked));
    };

    const changeSelect = (fn, e) => {
        let value = e.target.value;
        props.dispatch(fn(value));
    };

    const termLeaseYear = (terminationExercised) => {
        if (terminationExercised) {
            let leaseLength = answers['leaseLength'][round];
            let optionArray = getYearArr(leaseLength, 1, (i) => { return 'Year ' + i; });
            let qObj = Object.assign({}, questions['termination-lease-year'], {
                options: optionArray
            });
            return (<Question
                id="termination-lease-year"
                qObj={qObj}
                onChange={changeSelect.bind(null, setTermYear)}
                answerValue={answers['termYear'][round]}
                tooltip={'when-option'}
            />);
        } else {
            return (
                <div className="col-xs-12">
                    <p className="col-xs-6 nopadding">{questions['termination-lease-year']['text']}</p>
                    <p className="col-xs-6">N/A</p>
                </div>
            );
        }
    };

    const RenewOptionQuestions = ({ num }) => {
        let qObj = Object.assign({}, questions['renew-option-input']);
        qObj['text'] = qObj['text'] + ' ' + num + ':';
        const textFormtter = (i) => { return i + (i === 1 ? ' year' : ' years'); };
        qObj['options'] = num === 1 ? getYearArr(answers['renew1Max'][round] + 1, 0, textFormtter) : getYearArr(answers['renew2Max'][round] + 1, 0, textFormtter);
        if (num === 1 || answers['renewSwitch1'][round]) {
            return (
                <div>
                    <Question
                        id={'renew-option-input' + num }
                        qObj={ qObj }
                        answerValue={answers['renew' + num][round]}
                        onChange={num === 1 ? changeSelect.bind(null, setRenew1) : changeSelect.bind(null, setRenew2)}
                    />
                    <Question
                        id={'renew-option-switch' + num }
                        qObj={questions['renew-option-switch']}
                        answerValue={answers['renewSwitch' + num][round] }
                        onChange={num === 1 ? changeSwitch.bind(null, setRenewSwitch1) : changeSwitch.bind(null, setRenewSwitch2)}
                        tooltip={'renew-option-switch'}
                    />
                </div>
            );
        } else {
            return <div></div>;
        }
    };

    const renewOption = (terminationExercised) => {
        let renewOptionNumber = answers['renewOptionNumber'][round];
        let renewOption = answers['renewOption'][round];
        if (!terminationExercised) {
            return (
                <div>
                    <Question
                        id="renew-option"
                        qObj={questions['renew-option']}
                        onChange={changeSwitch.bind(null, setRenewOption)}
                        answerValue={answers['renewOption'][round]}
                        tooltip={'renewal'}
                    />
                    {renewOption &&
                        <div>
                            <Question
                                id="renew-option-number"
                                qObj={questions['renew-option-number']}
                                onChange={changeSelect.bind(null, setRenewOptionNumber)}
                                answerValue={answers['renewOptionNumber'][round]}
                            />
                            <RenewOptionQuestions num={ 1 } />
                            {renewOptionNumber > 1 && <RenewOptionQuestions num={ 2 } />}
                        </div>
                    }
                </div>
            );
        }
        return <div></div>;
    };

    let terminationOption = answers['terminationOption'][round];
    let terminationExercised = answers['terminationExercised'][round];
    if (!(step1['existOrNew'][round] === 'Existing' && step1['classification'][round] === 'Operating Lease')) {
        return (
            <div>
                <Question
                    id="termination-contraction-option"
                    qObj={questions['termination-contraction-option']}
                    onChange={changeSwitch.bind(null, setTerminationOption)}
                    answerValue={answers['terminationOption'][round]}
                    tooltip={'termination-option'}
                />
                {terminationOption &&
                    (<div>
                        <Question
                            id="termination-exercised"
                            qObj={questions['termination-exercised']}
                            onChange={changeSwitch.bind(null, setTerminationExercised)}
                            answerValue={answers['terminationExercised'][round]}
                            tooltip={'reasonable-certainty'}
                        />
                        {termLeaseYear(terminationExercised)}
                    </div>)
                }
                {renewOption(terminationExercised)}
            </div>
        );
    }
    return <div></div>;
};

export default Step2;