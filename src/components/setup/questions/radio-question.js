'use strict';
import React from 'react';
import Radio from '../../../components/common/radio';
import Tooltip from '../../../components/common/tooltip';

const RadioQuestion = ({ id, text, selected, options, onChange, prevAnswer, completedRound, tooltip }) => {
    return (
        <div className={'col-xs-12 nopadding radio-question ' + id} >
            <div className="col-xs-12 col-md-6">
                <p className="question-text">{text}</p>
                <Tooltip tooltip={tooltip} />
            </div>
            <div className="col-xs-6 col-md-3">
                <Radio
                    groupName = {id}
                    selected = {selected}
                    options = {options}
                    onChange = {onChange}
                />
            </div>
            <div className="col-xs-4 col-md-2 other-input">
                {completedRound === 2 &&
                    <p>{ options.find((v) => { return v.id === prevAnswer; }).text }</p>
                }
            </div>
            <div className="col-xs-2 col-md-1">
                {completedRound === 2 && prevAnswer !== selected &&
                    <div className="changed-circle"></div>
                }
            </div>
        </div>
    );
};

export default RadioQuestion;