import React, { Component } from 'react';

function checkLastDecimal(value) {
    const excludesLast = value.substr(0, value.length - 1);
    const multipleDecimal = excludesLast.includes('.');
    return multipleDecimal ? excludesLast : value;
}

function limitTwoDecimal(value) {
    const decimalLocation = value.indexOf('.');
    if (decimalLocation === -1) {
        return value;
    }
    const length = (value.length - 1);
    return (length - decimalLocation) > 2 ? value.substr(0, value.length - 1) : value;
}

class Input extends Component {
    componentDidUpdate(prev) {
        let { formatter } = this.props;
        this.refs['input'].value = formatter(this.props.value);
    }

    onType() {
        const input = this.refs.input;
        let value = input.value;
        value = value.toString().replace(/[^0-9.]/g, '');
        if (value[value.length - 1] === '.') {
            value = checkLastDecimal(value);
        }
        value = limitTwoDecimal(value);
        const selectionStart = input.selectionStart;
        this.refs['input'].value = value;
        input.setSelectionRange(selectionStart, selectionStart);
    }

    render() {
        let { id, onChange, value, type, placeholder, formatter, disabled } = this.props;
        value = value ? formatter ? formatter(value) : value : '';
        return (
            <div className="input-wrapper">
                <input
                    className="form-control money-input"
                    ref="input"
                    type={type}
                    id={id}
                    onChange={this.onType.bind(this)}
                    onBlur={onChange}
                    placeholder={placeholder}
                    min={0}
                    disabled={disabled}
                />
            </div>
        );
    }
}

export default Input;