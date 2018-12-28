'use strict';
import React from 'react';

const NextPrevButton = ({ isActive, text, onClick, className }) => {
    return (
        <button className={className + ' ' + (isActive ? 'btn btn-primary' : 'btn btn-secondary--alt')} onClick={onClick} >
            {text}
        </button>
    );
};

export default NextPrevButton;