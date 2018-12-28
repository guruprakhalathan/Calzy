'use strict';
import React from 'react';
import tableValueMap from '../../services/result-table-value-map';
import { commaFormat } from '../../services/formatter';

const fillArray = (n, offset = 0) => {
    return Array.from(new Array(n), (val, index) => index + offset);
};

const ResultTable = (props) => {
    let { tableValues, tableOrder, totalRowData, initialRow, maxLength, currencyAbbr } = props;

    const getRow = (idx) => {
        return (
            <tr key={idx}>
                {tableOrder.map((key, j) => {
                    let val = tableValues[key][idx];
                    if (val === 0 || val === null) {
                        return <td key={idx + j}>{val}</td>;
                    }
                    return <td key={idx + j}>{!isNaN(val) ? (val < 0 ? `(${commaFormat(Math.abs(Math.round(val)))})` : commaFormat(Math.round(val))) : val}</td>;
                })}
            </tr>
        );
    };

    const getEmptyRow = (key) => {
        return (
            <tr key={key} className="empty-row">
                <td></td>
            </tr>
        );
    };

    const getTopBottomRow = (data) => {
        return data.map((value, idx) => {
            if (value === null) {
                return <td key={idx}></td>;
            }
            return <td key={idx}>{!isNaN(value) ? (value < 0 ? `(${commaFormat(Math.abs(Math.round(value)))})` : commaFormat(Math.round(value))) : value}</td>;
        });
    };

    let years = tableValues ? tableValues['annualRent'] ? fillArray(tableValues['annualRent'].length) : null : null;
    if (years) {
        let extraYears = years.length < maxLength ? fillArray(maxLength - years.length) : null;
        return (
            <table className="result-table">
                <tbody>
                    <tr>
                        {tableOrder.map((title, idx) => {
                            return <th key={idx}>{tableValueMap(title)} {title !== 'years' && `(${currencyAbbr})`}</th>;
                        })}
                    </tr>
                    <tr>
                        {getTopBottomRow(initialRow)}
                    </tr>
                    {years.map((year) => {
                        return getRow(year);
                    })}
                    {extraYears && extraYears.map((year) => {
                        return getEmptyRow('empty-' + year);
                    })}
                    <tr className="total-row">
                        {getTopBottomRow(totalRowData)}
                    </tr>
                </tbody>
            </table>
        );
    }
    return <div></div>;
};

export default ResultTable ;
