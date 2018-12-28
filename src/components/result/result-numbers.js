'use strict';
import React from 'react';
import tableValueMap from '../../services/result-table-value-map';
import { moneyFormat } from '../../services/formatter';

const ResultNumber = ({ tableValues, currency, currencyAbbr }) => {
    if (tableValues) {
        let expense = 'totalExpense' in tableValues ? tableValues['totalExpense'][0] : tableValues['straightLineRentExpense'][0];
        let expenseText = 'totalExpense' in tableValues ? ('Year 1 - ' + tableValueMap('totalExpense')) : tableValueMap('straightLineRentExpense');
        let presentValue = 'presentValueOfRent' in tableValues ? tableValues['presentValueOfRent'] : null;
        let presentValueText = 'presentValueOfRent' in tableValues ? tableValueMap('presentValueOfRent') : null;
        return (
            <div className="nopadding col-xs-12 result-number">
                <div className="col-xs-6">
                    <p className="text-title">{expenseText}</p>
                    <p className="number">{expense ? moneyFormat({
                        currency: currency,
                        decimal: true,
                    }, Math.round(expense).toFixed(0)) : null} ({currencyAbbr})</p>
                </div>
                <div className="col-xs-6">
                    <p className="text-title">{presentValueText}</p>
                    <p className="number">{presentValue ? `${moneyFormat({
                        currency: currency,
                        decimal: true,
                    }, Math.round(presentValue).toFixed(0))} (${currencyAbbr})` : null}</p>
                </div>
            </div>
        );
    }
    return <div></div>;
};

export default ResultNumber;
