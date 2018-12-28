import React from 'react';

const Selector = ({ value, options, onChange }) => {
    return (
        <div className="styled-select form-control full">
            <select value={value} onChange={onChange} tabIndex="0">
                {options && options.map((val, idx) => {
                    if (typeof val === 'object') {
                        return <option key={idx} value={val.id}>{val.text}</option>;
                    }
                    return <option key={idx} value={val}>{val}</option>;
                })}
            </select>
        </div>
    );
};

export default Selector;