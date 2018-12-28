'use strict';
import React from 'react';
import { commaFormat, moneyFormat } from '../../services/formatter';

const getYearText = (years, termOption, leaseTerm, extension, switch1, extension2, switch2) => {
    const formattedYear = (y, space = true) => {
        if (space) {
            return (y > 1 ? ' Years' : ' Year');
        } else {
            return (y > 1 ? 'Years' : 'Year');
        }
    };

    if (termOption) {
        return leaseTerm + formattedYear(leaseTerm) + ' (Assumes Termination Option Is Exercised) ';
        //return years + formattedYear(years) + ' with early termination: ' + leaseTerm + formattedYear(leaseTerm);
    } else if (!switch1 || (!extension && !extension2)) {
        return years + formattedYear(years) + ' No Extension';
    } else if (switch1 && switch2 && extension && extension2) {
        return leaseTerm + formattedYear(leaseTerm) + ' (Including: One ' + extension + '-Year Option and one ' + extension2 + '-Year Option)';
    } else if (extension) {
        return leaseTerm + formattedYear(leaseTerm) + ' (Including: One ' + extension + '-Year Option)';
    }
};

const getUnitFormatted = (unit) => {
    return unit === 'sqft' ? 'Sq. Ft.' : 'Sq. M.';
};

const getRentFormatted = (rent, rentType, unit, currency, currencyAbbr) => {
    if (rentType === 'unit') {
        return 'Year 1 Actual Cash Rent: ' + moneyFormat({ currency: currency, decimal: true }, rent.toFixed(2)) + ' / ' + getUnitFormatted(unit) + ' (' + currencyAbbr + ')';
    } else {
        return 'Total First Year Rent: ' + moneyFormat({ currency: currency, decimal: true }, Math.round(rent).toFixed(0)) + ' (' + currencyAbbr + ')';
    }
};

const getIncreaseFormatted = (increase, increaseType, annualIncreaseType, unit, currency, currencyAbbr) => {
    if (increaseType === 'no') {
        return 'No Annual Increase';
    } else if (increaseType === 'variable') {
        return 'Customized Annual Input(s)';
    } else {
        if (annualIncreaseType === 'percentage') {
            return increase + '%';
        } else if (annualIncreaseType === 'unit') {
            return currency + increase + ' per ' + getUnitFormatted(unit) + '(' + currencyAbbr + ')';
        } else {
            return currency + increase;
        }
    }
};

const RentSummary = (props) => {
    let { shouldShow = true, standard, classification, existOrNew, years, termOption, leaseTerm, extension, switch1, extension2, switch2, area, unit, rent, rentType, increase, increaseType, annualIncreaseType, borrowRate, currency, currencyAbbr } = props;
    if (shouldShow) {
        return (
            <div className="col-xs-12 rent-summary">
                <div className="col-xs-12 col-md-3 left-group">
                    <label>Lease Standard</label>
                    <p>{standard} - {existOrNew}</p>
                </div>
                <div className="col-xs-12 col-md-3 left-group">
                    <label>Classification</label>
                    <p>{classification}</p>
                </div>
                <div className="col-xs-12 col-md-6 right-group">
                    <label>Input Detail</label>
                    <p>Term: {getYearText(years, termOption, leaseTerm, extension, switch1, extension2, switch2)}</p>
                    <p>Rentable Area: {commaFormat(area)} {getUnitFormatted(unit)} </p>
                    <p>{getRentFormatted(rent, rentType, unit, currency, currencyAbbr)}</p>
                    <p>Rent Increases: {getIncreaseFormatted(Number(increase).toFixed(2), increaseType, annualIncreaseType, unit, currency, currencyAbbr)}</p>
                    <p>Incremental Borrowing Rate: {Number(borrowRate).toFixed(2) + '%'}</p>
                </div>
                <div className="col-xs-12 col-md-12 green-disclaimer">Note: The balance sheet impact, if any, does not reflect prepaid rent, lease incentives and/or initial direct costs.</div>
            </div>
        );
    }
    return <div className="col-xs-12 rent-summary"></div>;
};

export default RentSummary;
