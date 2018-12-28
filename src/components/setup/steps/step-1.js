'use strict';
import React from 'react';
import StepTitle from '../step-title';
import Question from '../../../components/setup/questions';
import { setLeaseStandard, setExistOrNew, setScenariosAnswers } from '../../../actions/steps/step1-actions.js';


class Step1 extends React.Component {
    componentDidMount() {
        $('[data-toggle="tooltip"]').popover();
    }
    componentDidUpdate() {
        $('[data-toggle="tooltip"]').popover();
    }
    render() {
        let props = this.props;
        let questions = props.questions.steps ? props.questions.steps[props.nav.step] : null;
        let round = props.nav.round;
        let answers = props.answers ? props.answers.step1 : null;
        let scenarios = (questions && answers) ? questions['scenarios'][answers['scenarioNumber'][round]] : [];
        let scenariosAnswers = answers ? answers['scenariosAnswers'][round] : null;
        let nav = props.nav;
        let otherRound = round === 0 ? 1 : 0;
        const changeSelect = (fn, e) => {
            let value = e.target.value;
            props.dispatch(fn(value));
        };

        const toggleSwitch = (e) => {
            let checked = e.target.checked;
            let idx = e.target.dataset.idx;
            scenariosAnswers[idx] = checked ? true : false;
            props.dispatch(setScenariosAnswers(scenariosAnswers));
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
                        id="lease-report-standard"
                        qObj={questions['lease-report-standard']}
                        onChange={changeSelect.bind(null, setLeaseStandard)}
                        answerValue={answers['lps'][round]}
                        prevAnswer={answers['lps'][otherRound]}
                        completedRound={nav.completedRound}
                        tooltip={'accounting-standard'}
                    />
                    <Question
                        id="exist-or-new-lease-standard"
                        qObj={questions['exist-or-new-lease-standard']}
                        onChange={changeSelect.bind(null, setExistOrNew)}
                        answerValue={answers['existOrNew'][round]}
                        prevAnswer={answers['existOrNew'][otherRound]}
                        completedRound={nav.completedRound}
                    />
                    {scenarios && scenarios.map((s, idx) => {
                        return (<Question
                            key={s.id}
                            id={s.id}
                            qObj={s}
                            idx= {idx}
                            onChange={toggleSwitch}
                            answerValue={ scenariosAnswers ? scenariosAnswers[idx] : false }
                            tooltip={s.tooltip}
                        />);
                    })}
                    <div className="col-xs-12 nopadding">
                        <div className="col-md-6 col-xs-12">
                            <p className="question-text">
                                <strong>{ questions['lease-classification-text'] }</strong>
                            </p>
                        </div>
                        <p className="col-md-3 col-xs-6"><strong>{ answers['classification'][round] }</strong></p>
                        {nav.completedRound === 2 &&
                            <div>
                                <p className="col-md-2 col-xs-4 other-input">{ answers['classification'][otherRound] }</p>
                                <p className="col-md-1 col-xs-2">{ answers['classification'][round] !== answers['classification'][otherRound] &&
                                <div className="changed-circle"></div>
                            }</p>
                            </div>
                        }
                    </div>
                </div>
            );
        }
        return (<div></div>);
    }
}


export default Step1;