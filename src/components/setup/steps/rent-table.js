import React from 'react';
import MoneyInput from '../../../components/common/money-input';
import { commaFormat, moneyFormat, formatMoney } from '../../../services/formatter';
import { setInitialRent, setRentArr } from '../../../actions/steps/step4-actions';

const RentTable = ({
        answers, step3, rentArr, isUnit, unit, area, round, disabled, dispatch, includeTermination, currency, terminationFee,
    }) => {
    const rentInputHeader = (isUnit, unit) => {
        return (
            <div className={'rent-input-header col-xs-12 nopadding ' + (disabled && 'disabled')}>
                <p className={'col-xs-2 nopadding ' + (disabled && 'no-year')}>Year</p>
                {!disabled &&
                    <div>
                        <p className="col-xs-5 nopadding">{isUnit ? (unit === 'sqft' ? 'Rent Per Sq. Ft.' : 'Rent Per Sq. M.') : 'Total Rent'}</p>
                        <p className="col-xs-4 nopadding total-header">Total</p>
                    </div> ||
                    <div>
                        <p className="col-xs-5 col-md-6 nopadding">{isUnit ? (unit === 'sqft' ? 'Rent Per Sq. Ft.' : 'Rent Per Sq. M.') : 'Total Rent'}</p>
                        <p className="col-xs-4 col-md-6 nopadding total-header">Total</p>
                    </div>
                }

            </div>
        );
    };

    const changeRentForYear = (idx, isUnit, prev, e) => {
        let value = e.target.value;
        if (formatMoney(prev) !== formatMoney(value)) {
            let rentArr = answers['rentArr'][round].slice();
            rentArr[idx] = isUnit ? Number(formatMoney(value) * step3['rentableArea'][round]) : Number(formatMoney(value, !isUnit));
            if (idx === 0) {
                dispatch(setInitialRent(formatMoney(value, !isUnit), false));
            }
            dispatch(setRentArr(rentArr));
        }
    };

    const getUnitDollarValue = (totalRent, area) => {
        return area ? commaFormat((totalRent / area).toFixed(2)) : 0;
    };

    const rentInputDisabled = (value, idx, isUnit, currency, area, unit, isLastRow, terminationFee) => {
        const showTermaintion = isLastRow && includeTermination;
        const totalValue = showTermaintion ? (Number(value) + terminationFee) : value;
        const total = moneyFormat({ currency: currency, decimal: isUnit }, totalValue);
        return (
            <div className={ 'col-xs-12 nopadding rent-input other-input currency-font' + (isUnit ? ' unit-rent' : '')} key={idx}>
                <p className="col-xs-2 nopadding no-year">{'Year ' + (idx + 1)}</p>
                {isUnit ?
                    <p className="rent-input-unit-text col-md-6 col-xs-5 nopadding">{currency + getUnitDollarValue(value, area)} / { unit === 'sqft' ? 'sq. ft.' : 'sq. m.' }</p> :
                    <p className="rent-input-unit-text col-md-6 col-xs-5 nopadding">{currency + value}</p>
                }
                <p className="total col-xs-4 col-md-6 nopadding">{total}{showTermaintion && '*'}</p>
            </div>
        );
    };

    const rentInput = (value, idx, isUnit, currency, area, isLastRow, terminationFee) => {
        const showTermaintion = isLastRow && includeTermination;
        const totalValue = showTermaintion ? (Number(value) + terminationFee) : value;
        const total = moneyFormat({ currency: currency, decimal: isUnit }, totalValue);
        return (
            <div className={ `col-xs-12 nopadding rent-input ${isUnit && 'unit-rent'} currency-font` } key={idx}>
                <p className="col-xs-2 nopadding">{'Year ' + (idx + 1)}</p>
                <div className="col-xs-5 nopadding">
                    <MoneyInput
                        id={'rent-' + idx}
                        onChange={changeRentForYear.bind(null, idx, isUnit, currency + (isUnit ? getUnitDollarValue(value, area) : value))}
                        value={isUnit ? getUnitDollarValue(value, area) : value }
                        type={'text'}
                        placeholder={currency + '0.00'}
                        formatter={moneyFormat.bind(null, {
                            currency: currency,
                            decimal: isUnit,
                        })}
                    />
                </div>
                <p className="col-xs-4 nopadding total">{total}<span>{showTermaintion && '*'}</span></p>
            </div>
        );
    };

    return (
        <div className="col-xs-12 nopadding">
            <div className="col-xs-12 nopadding">
                { rentInputHeader(isUnit, unit) }
            </div>
            <div className="col-xs-12 nopadding">
                { rentArr.map((val, idx) => {
                    const isLastRow = idx === rentArr.length - 1;
                    if (disabled) {
                        return rentInputDisabled(val, idx, isUnit, currency, area, unit, isLastRow, terminationFee);
                    }
                    return rentInput(val, idx, isUnit, currency, area, isLastRow, terminationFee);
                })}
            </div>
        </div>
    );
};

export default RentTable;