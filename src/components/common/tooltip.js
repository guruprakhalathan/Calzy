import React from 'react';
import tooltipContent from '../../tooltip/tooltipContent';

const Tooltip = ({ tooltip }) => {
    if (tooltip && (tooltip in tooltipContent)) {
        return (
            <a className="question-tooltip" data-toggle="tooltip" title={tooltipContent[tooltip].title} data-content={tooltipContent[tooltip].content} data-trigger="focus" data-html="true" tabIndex="0" role="button">
                <svg>
                    <use xlinkHref="assets/svg/icons.svg#icon-question-sign"></use>
                </svg>
            </a>
        );
    }
    return <a></a>;
};

export default Tooltip;