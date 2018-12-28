'use strict';
import React from 'react';
import MoneyInput from '../../../components/common/money-input';
import Input from '../../../components/common/input';
import Tooltip from '../../../components/common/tooltip';

const InputQuestion = ({ id, text, type, value, onChange, afterComp, prevAnswer, completedRound, formatter, otherFormatter, placeholder, moneyInput, textIdx = 0, tooltip, disabled }) => {
    return (
        <div className="col-xs-12 nopadding input-question">
            <div className="col-xs-12 col-md-6">
                <p className="question-text">{Array.isArray(text) ? text[textIdx] : text }</p>
                <Tooltip tooltip={tooltip} />
            </div>
            <div className="col-xs-6 col-md-3">
                {moneyInput &&
                <MoneyInput
                    id={id}
                    onChange={onChange}
                    value={value}
                    type={type}
                    formatter={formatter}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                || <Input
                    id={id}
                    onChange={onChange}
                    value={value}
                    type={type}
                    formatter={formatter}
                    placeholder={placeholder}
                    disabled={disabled}
                /> }
                { afterComp }
            </div>
            <div className={`col-xs-4 col-md-2 other-input ${id === 'initial-rent' ? 'currency-font' : ''}`}>
                {completedRound === 2 &&
                    <p>{ otherFormatter ? otherFormatter(prevAnswer) : prevAnswer }</p>
                }
            </div>
            <div className="col-xs-2 col-md-1">
                {completedRound === 2 && prevAnswer !== value &&
                    <div className="changed-circle"></div>
                }
            </div>
        </div>
    );
};

export default InputQuestion;