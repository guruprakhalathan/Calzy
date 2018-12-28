'use strict';
import React from 'react';

const LandingPage = () => {
    return (
        <div className="landing-page col-xs-12 nopadding">
            <div className="title-wrapper">
                <img className="background-img" src="img/background2.jpg" />
                <p className="title">How the New FASB/IASB Standards <br/> May Impact Your Financial Statements</p>
            </div>
            <div className="box col-xs-12">
                <p className="header"><span>Use Adams's Lease Accounting Calculator to Learn More</span></p>
                <p>
                    As an industry leader, Adams is focused on educating our clients and helping them understand the potential financial impact of entering into a lease based on the new lease accounting standards. To further this goal, Adams has developed a web-based tool, the Lease Accounting Calculator, to allow you to prepare a high-level lease analysis (or to compare two leases) based on either the new or existing FASB or IASB standards. For an overview of the tool and methodology, please click on the Tool Overview and/or the Video Preview buttons below. To use the Calculator, please click on Begin Lease Analysis.
                </p>
                <p>
                    For additional information, Adams’s Global Task Force on Lease Accounting hosts a FASB/IASB web page on Adams.com featuring white papers, webinars, and technical updates to help you navigate the new lease environment. <a href="http://www.Adams.com/real-estate-services/real-estate-industries/fasb-iasb" target="_blank">FASB/IASB</a>
                </p>
                <a href="#tool-overview" target="_blank" className="btn btn-primary--alt">Tool Overview</a>
                <a href="#setup/1" className="btn btn-primary--alt">Begin Lease Analysis</a>
                <p>Lease analyses provided by this site are estimates only. For those leases being analyzed under the new lease accounting standards, the calculations are based on the presumption that the lease is executed after adoption of the new standard by the lessee. Using this website signifies that you have read and accepted Adams’s <a href="./terms.html" target="_blank">Terms and Conditions of Use.</a></p>
            </div>
            <div className="lower col-xs-12">
                <p>© 2019 Adams, Inc. All rights reserved. Estimates presented are hypothetical and provided without representation or warranty of any kind, including as to their accuracy, completeness, or fitness for any particular purpose. Any reliance by you on the estimates provided on this website is solely at your own risk.</p>
            </div>
        </div>
    );
};

export default LandingPage;



