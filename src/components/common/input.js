import React from 'react';

const Input = ({ id, onChange, value, type, placeholder, formatter, disabled }) => {
    value = value ? formatter ? formatter(value) : value : '';
    return (
        <div className="input-wrapper">
            <input className="form-control" type={type} id={id} onChange={onChange} value={value} placeholder={placeholder} min={0} disabled={disabled} tabIndex="0"/>
        </div>
    );
};

export default Input;