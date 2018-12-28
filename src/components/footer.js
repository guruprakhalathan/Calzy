'use strict';
import React from 'react';

const Footer = (props) => {
    return (
        <footer>
            {!(props.nav.page === '#landing-page' || props.nav.page === '#result-page') &&
                    <div>
                        <p>© 2019 Adams, Inc. All rights reserved.</p>
                        <img src="img/made-with-epicenter.svg"/>
                    </div>
            }
            {props.nav.page === '#result-page' &&
                <p className="result-page-footer">© 2019 Adams, Inc. All rights reserved. The estimates contained herein are subject to Adams <a href="./terms.html" target="__blank">Terms and Conditions of Use.</a> Without limiting such Terms and Conditions, no representation or warranty of any kind is made as to the accuracy, completeness, or fitness for any particular purpose of the estimates contained herein, all of which are hypothetical. You are solely responsible for independently verifying, and any reliance by you on the estimates provided on this website is at your own risk.</p>
            }
        </footer>
    );
};
export default Footer;