'use strict';
import React from 'react';
import Select from '../../../components/common/select';
import Tooltip from '../../../components/common/tooltip';

const SelectQuestion = ({ id, text, value, options, onChange, prevAnswer, prevAnswerFormat = false, completedRound, tooltip }) => {
    return (
        <div className={'col-xs-12 nopadding select-question ' + id}>
            <div className="col-xs-12 col-md-6">
                <p className="question-text">{text}</p>
                <Tooltip tooltip={tooltip} />
            </div>
            <div className="col-xs-6 col-md-3">
                <Select
                    name={id}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </div>
            <div className={`col-xs-4 col-md-2 other-input ${id === 'lease-currency' ? 'currency-font' : ''}`} >
                {completedRound === 2 &&
                    <p>{ prevAnswerFormat ? prevAnswerFormat(prevAnswer) : prevAnswer }</p>
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

export default SelectQuestion;