'use strict';
import React from 'react';
const Header = (props) => {
    let nav = props.nav;

    return (
        <header className="navbar navbar-default navbar-fixed-top">
                <a href="#">
                    <svg width="100" height="200" className={'logo' + (nav.page === '#result-page' ? ' hidden-mobile' : '')}>
                        <use xlinkHref="assets/svg/icons.svg#icon-cbre-logo" />
                    </svg>
                </a>
                <h1>Lease Accounting Calculator</h1>
            <ul className="navbar__nav">
                <li className="js-about-toggle"><a href="./glossary.html" target="_blank" tabIndex="-1">Reference Guide <svg><use xlinkHref="assets/svg/icons.svg#icon-question-sign" /></svg></a></li>
            </ul>
        </header>
    );
};

export default Header;