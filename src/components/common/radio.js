import React from 'react';
import Tooltip from '../../components/common/tooltip';

const Radio = ({ groupName, selected, options, onChange }) => {
    return (
        <div className={'form-inputs ' + groupName} >
            {options && options.map((o, idx) => {
                return (
                    <div className="radio-input" key={o.id}>
                        <input
                            type="radio"
                            className="form-control radio"
                            name={groupName}
                            id={o.id}
                            value={o.id}
                            onChange={onChange}
                            checked={o.id === selected}
                            tabIndex="0"
                        ></input>
                        <label htmlFor={o.id}>{o.text}</label>
                        {o.id === 'fixed' &&
                            <Tooltip tooltip="fixed" />
                        }
                        {o.id === 'variable' &&
                            <Tooltip tooltip="custom" />
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default Radio;