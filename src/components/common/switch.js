'use strict';

import React, { PropTypes }from 'react';

const Switch = ({ id, onSwitch, checked, idx }) => {
    return (
        <div className="form-inputs switch-wrapper">
        <input id={id} checked={checked} onChange={(e) => { onSwitch(e); }} className="switch form-control" type="checkbox" data-idx={idx}/>
        <label htmlFor={id} >
            <span>no</span>
            <span>yes</span>
        </label>
        </div>
    );
};
 

export default Switch;