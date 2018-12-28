import React from 'react';

import PersonalizeRow from './personalize-row';
import RentSummary from './rent-summary';
import ResultNumber from './result-numbers';
import ResultChart from './result-chart';
import ResultTable from './result-table';
import { getCurrency, getCurrencyAbbr } from '../../services/formatter';
import PrintHeader from './print-header';
import PrintFooter from './print-footer';
const Overview = ({ steps, nav, round, shouldShow = true }) => {
    if (shouldShow) {
        return (
            <div className="col-xs-12 nopadding overview">
                <p className="col-xs-12 project-title">{steps.personalize.projectName[round]}</p>
                <div className="col-xs-12">
                    <RentSummary
                        shouldShow={shouldShow}
                        standard={steps.step1.lps[round]}
                        existOrNew={steps.step1.existOrNew[round]}
                        classification={steps.step1.classification[round]}
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
            </div>
        );
    }
    return <div></div>;
};

const Detail = ({ steps, results, round, shouldShow = true }) => {
    let getRentExpense = (round) => {
        return results.tableValues[round] ? results.tableValues[round]['totalExpense'] ? results.tableValues[round]['totalExpense'] : results.tableValues[round]['straightLineRentExpense'] : [];
    };
    if (shouldShow) {
        return (
            <div className="page col-xs-12">
                <p className="col-xs-12 project-title">{steps.personalize.projectName[round]}</p>
                <div className="col-xs-4">
                    <ResultNumber
                        tableValues={results.tableValues[round]}
                        currency={getCurrency(steps.step3.currency[round])}
                        currencyAbbr={getCurrencyAbbr(steps.step3.currency[round])}
                    />
                </div>
                <div className="col-xs-8">
                    <ResultChart
                        rentArr={steps.step4.rentArr[round]}
                        rentExpense={getRentExpense(round)}
                        currency={getCurrency(steps.step3.currency[round])}
                        isPrint
                    />
                </div>
                <div className="col-xs-12">
                    <ResultTable
                        tableValues={ results.tableValues[round] }
                        tableOrder={ results.tableOrder[round] }
                        totalRowData = { results.totalRowData[round] }
                        initialRow = { results.initialRow[round] }
                        currencyAbbr={getCurrencyAbbr(steps.step3.currency[round])}
                    />
                </div>
                <PrintFooter />
            </div>
        );
    }
    return <div></div>;
};

const PrintPage = ({ results, steps, nav }) => {
    if (results && results.showPrint) {
        return (
            <div className="print-page col-xs-12 nopadding">
                <div className="page col-xs-12">
                    <PrintHeader />
                    <PersonalizeRow
                        preparedFor = {steps.personalize.preparedFor}
                        preparedBy = {steps.personalize.preparedBy}
                        nav = {nav}
                    />
                    <Overview
                        steps = {steps}
                        nav = {nav}
                        round = {0}
                    />
                    <Overview
                        steps = {steps}
                        nav = {nav}
                        round = {1}
                        shouldShow = {nav.completedRound === 2}
                    />
                    <div className="disclaimer">Note: The balance sheet impact, if any, does not reflect prepaid rent, lease incentives and/or initial direct costs.</div>
                    <div id="external-link">For additional information, Adams’s Global Task Force on Lease Accounting hosts a FASB/IASB web page on Adams.com featuring white papers, webinars, and technical updates to help you navigate the new lease environment. FASB/IASB.
                        <a href="http://www.Adams.com/real-estate-services/real-estate-industries/fasb-iasb">http://www.Adams.com/real-estate-services/real-estate-industries/fasb-iasb</a>
                    </div>
                    <PrintFooter />
                </div>
                <Detail
                    steps = {steps}
                    round = {0}
                    results = {results}
                />
                <Detail
                    steps = {steps}
                    round = {1}
                    results = {results}
                    shouldShow = {nav.completedRound === 2}
                />
            </div>
        );
    } return (<div></div>);
};

export default PrintPage;
