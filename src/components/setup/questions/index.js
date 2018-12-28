'use strict';
import React from 'react';
import SelectQuestion from './select-question';
import SwitchQuestion from './switch-question';
import RadioQuestion from './radio-question';
import InputQuestion from './input-question';

const Question = ({ qObj, answerValue, id, onChange, idx, afterComp, prevAnswer, prevAnswerFormat = false, completedRound, formatter, otherFormatter, placeholder, moneyInput = false, textIdx, tooltip, text, disabled }) => {
    if (qObj && qObj.type === 'select') {
        return (<SelectQuestion
            id = { id }
            text = { text ? text : qObj.text }
            value = { answerValue }
            options = { qObj.options }
            onChange = { onChange }
            prevAnswer = { prevAnswer }
            completedRound = { completedRound }
            prevAnswerFormat = { prevAnswerFormat }
            tooltip = { tooltip }
        />);
    } else if (qObj && qObj.type === 'switch') {
        return (<SwitchQuestion
            id = { id }
            text = { text ? text : qObj.text }
            checked = { answerValue }
            onSwitch = { onChange }
            idx = { idx }
            prevAnswer = { prevAnswer }
            completedRound = { completedRound }
            tooltip = { tooltip }
        />);
    } else if (qObj && qObj.type === 'radio') {
        return (<RadioQuestion
            id = { qObj.id }
            text = { text ? text : qObj.text }
            selected = { answerValue }
            options = { qObj.options }
            onChange = { onChange }
            prevAnswer = { prevAnswer }
            completedRound = { completedRound }
            tooltip = { tooltip }
        />);
    } else if (qObj && qObj.type === 'input') {
        return (<InputQuestion
            id = { id }
            text = { text ? text : qObj.text }
            type = { qObj['input-type'] }
            value = { answerValue }
            onChange = { onChange }
            afterComp = { afterComp }
            prevAnswer = { prevAnswer }
            prevAnswerFormat = { prevAnswerFormat }
            completedRound = { completedRound }
            formatter = { formatter }
            otherFormatter = { otherFormatter }
            placeholder = { placeholder }
            moneyInput = { moneyInput }
            textIdx = { textIdx }
            tooltip = { tooltip }
            disabled = { disabled }
        />);
    }
    return <div></div>;
};

export default Question;