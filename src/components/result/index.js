'use strict';
import React from 'react';
import PersonalizeRow from '../../containers/personalize-row-container';
import AddNewLease from '../../components/result/add-new-lease';

import Project from '../../components/result/project';
import PrintPage from '../../components/result/print-page';

const Result = (props) => {
    let steps = props.answers;
    let results = props.results;
    let nav = props.nav;

    if (steps && results) {
        return (
            <div className="col-xs-12 nopadding">
                <div id="result-container" className="col-xs-12">
                    <PersonalizeRow
                        preparedFor = {steps.personalize.preparedFor}
                        preparedBy = {steps.personalize.preparedBy}
                        nav = {nav}
                    />
                    <div className="result-row">
                        <div className="nopadding-mobile col-md-6 col-xs-12">
                            <Project
                                steps = {steps}
                                results = {results}
                                nav = {nav}
                                round = {0}
                                dispatch = { props.dispatch }
                            />
                        </div>
                        { nav.completedRound === 2 ?
                            <div className="nopadding-mobile col-md-6 col-xs-12">
                                <Project
                                    steps = {steps}
                                    results = {results}
                                    nav = {nav}
                                    round = {1}
                                    dispatch = { props.dispatch }
                                />
                            </div>
                            :
                            <AddNewLease dispatch={props.dispatch} />
                        }
                    </div>
                </div>
                <PrintPage
                    results = { results }
                    steps = { steps }
                    nav = { nav }
                />
            </div>
        );
    }
    return <div></div>;
};

export default Result;