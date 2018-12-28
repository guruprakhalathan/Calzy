'use strict';
import React from 'react';

import { copyLease } from '../../actions/result-actions';

const AddNewLease = ({ dispatch }) => {
    const onClick = () => {
        dispatch(copyLease());
    };
    return (
        <div className="add-new-lease col-xs-12 col-md-6">
            <p>This tool is capable of comparing different variables within the same lease, or comparing two separate leases. By clicking here you will create a copy of the data you have already entered as a starting point for Lease #2. You will be able to change any of your prior inputs to allow for comparison.</p>
            <button type="button" className="btn btn-primary--alt" onClick={onClick}>Copy and Edit Lease for Comparison</button>
        </div>
    );
};

export default AddNewLease;