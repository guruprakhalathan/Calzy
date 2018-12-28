'use strict';
import React from 'react';

const StepTitle = ({ title, round, completedRound, projectName = [] }) => {
    return (
        <div className="col-xs-12 nopadding question-title">
            <p className="col-xs-12 col-md-6"><strong>{title}</strong></p>
            <div className="col-md-3 col-xs-6">
                <p>{round === 0 ? projectName[0] : projectName[1]}</p>
            </div>
            {completedRound === 2 &&
                <div className="col-md-2 col-xs-4">
                    <p className="nopadding">{round === 1 ? projectName[0] : projectName[1]}</p>
                </div>
            }
            {completedRound === 2 &&
                <div className="col-md-1 col-xs-2">
                    <p className="change-title">Changed</p>
                </div>
            }
        </div>
    );
};

export default StepTitle;