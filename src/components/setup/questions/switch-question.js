'use strict';
import React from 'react';
import Switch from '../../../components/common/switch';
import Tooltip from '../../../components/common/tooltip';

const SwitchQuestion = ({ id, text, checked, onSwitch, idx, prevAnswer, completedRound, tooltip }) => {
    return (
        <div className="col-xs-12 nopadding switch-question">
            <div className="col-xs-12 col-md-6">
                <p className="question-text">{text}</p>
                <Tooltip tooltip={tooltip} />
            </div>
            <div className="col-xs-6 col-md-3">
                <Switch
                    id={id}
                    checked={checked}
                    onSwitch={onSwitch}
                    idx = { idx }
                />
            </div>
            <div className="col-xs-4 col-md-2 other-input">
                {completedRound === 2 &&
                    <p>{ prevAnswer ? 'Yes' : 'No'}</p>
                }
            </div>
            <div className="col-xs-2 col-md-1">
                {completedRound === 2 && prevAnswer !== checked &&
                    <div className="changed-circle"></div>
                }
            </div>
        </div>
    );
};

export default SwitchQuestion;