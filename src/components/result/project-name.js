'use strict';
import React from 'react';
import { setRound } from '../../actions/nav-actions';
import { setProjectName } from '../../actions/personalize-actions';

const ProjectName = ({ dispatch, personalize, round }) => {
    const edit = (e) => {
        dispatch(setRound(Number(e.target.value)));
        window.location.href = '#setup/1';
    };


    const changeInputValue = (e) => {
        let value = e.target.value;
        if (value.length < 50) {
            dispatch(setProjectName(value, round));
        }
    };

    return (
        <p className="col-xs-12 project-name nopadding">
            <input onChange = { changeInputValue } value={personalize.projectName[round]} />
            <button className="edit-button btn-outline" onClick={edit.bind(this)} value={round}>Edit Inputs</button>
        </p>
    );
};

export default ProjectName;