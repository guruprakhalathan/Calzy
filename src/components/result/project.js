'use strict';
import React from 'react';
import ProjectName from './project-name';
import ResultChart from './result-chart';
import ResultNumber from './result-numbers';
import ResultTable from './result-table';
import RentSummary from './rent-summary';
import { getCurrency, getCurrencyAbbr } from '../../services/formatter';

const Project = (props) => {
    let steps = props.steps;
    let results = props.results;
    let nav = props.nav;
    let round = props.round;


    let getMaxLength = () => {
        let length1 = steps.step4.rentArr[0].length;
        let length2 = steps.step4.rentArr[1].length;
        return length1 > length2 ? length1 : length2;
    };

    let getRentExpense = (round) => {
        return results.tableValues[round] ? results.tableValues[round]['totalExpense'] ? results.tableValues[round]['totalExpense'] : results.tableValues[round]['straightLineRentExpense'] : [];
    };

    return (
        <div className="col-xs-12 nopadding">
            <ProjectName
                personalize = {steps.personalize}
                dispatch = {props.dispatch}
                round = { round }
            />
            { nav.resultTab === 0 ? (
                <div className="col-xs-12 result-overview nopadding">
                    <ResultNumber
                        tableValues={results.tableValues[round]}
                        currency={getCurrency(steps.step3.currency[round])}
                        currencyAbbr={getCurrencyAbbr(steps.step3.currency[round])}
                    />
                    <ResultChart
                        rentArr={steps.step4.rentArr[round]}
                        terminationFee={steps.step4.terminationFee[round]}
                        addTermFee={steps.step2['terminationOption'][round] && steps.step2['terminationExercised'][round]}
                        rentExpense={getRentExpense(round)}
                        currency={getCurrency(steps.step3.currency[round])}
                        classification={steps.step1.classification[round]}

                    />
                </div>
                ) :
                <ResultTable
                    maxLength={getMaxLength()}
                    tableValues={ results.tableValues[round] }
                    tableOrder={ results.tableOrder[round] }
                    totalRowData = { results.totalRowData[round] }
                    initialRow = { results.initialRow[round] }
                    currencyAbbr={getCurrencyAbbr(steps.step3.currency[round])}
                />
            }
            <RentSummary
                standard={steps.step1.lps[round]}
                classification={steps.step1.classification[round]}
                existOrNew={steps.step1.existOrNew[round]}
                years={steps.step2.leaseLength[round]}
                termOption={steps.step2.terminationExercised[round]}
                leaseTerm={steps.step2.leaseTerm[round]}
                extension={steps.step2.renew1[round]}
                switch1={steps.step2.renewSwitch1[round]}
                extension2={steps.step2.renew2[round]}
                switch2={steps.step2.renewSwitch2[round]}
                area={steps.step3.rentableArea[round]}
                unit={steps.step3.unit[round]}
                rent={steps.step4.initialRent[round]}
                rentType={steps.step4.leaseMeasurement[round]}
                increase={steps.step4.fixedIncrease[round]}
                increaseType={steps.step4.annualIncrease[round]}
                annualIncreaseType={steps.step4.annualIncreaseType[round]}
                borrowRate={steps.step4.borrowRate[round]}
                currency={getCurrency(steps.step3.currency[round])}
                currencyAbbr={getCurrencyAbbr(steps.step3.currency[round])}
            />
        </div>
    );
};

export default Project;
