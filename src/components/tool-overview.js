'use strict';
import React from 'react';

class ToolOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
        };
    }

    changeTab(tab) {
        this.setState({
            activeTab: tab,
        });
    }

    render() {
        return (
            <div className="tool-overview">
                <h1>OVERVIEW OF Adams’S LEASE ACCOUNTING CALCULATOR</h1>
                <p>Welcome to Adams’s Lease Accounting Calculator. As the new lease accounting standards will require virtually all leases to be recorded on a company's balance sheet, a significant departure from today's off-balance sheet treatment for operating leases, it is more important than ever to know how a lease will impact a company's financial statements prior to lease execution. This “interview-style” tool has been designed to provide you with a better understanding of the nuances of the new lease accounting standards as they relate to real estate leases, as well as provide you with an estimate of the possible financial impact that entering into a lease can have on your financial statements.</p>
                <p className="border-left">The following narrative is intended to familiarize you with the various input steps involved and information required to complete an analysis.  After you use the tool a few times, the workflow process should become very intuitive so you can input information and generate results quickly.</p>
                <p>Please find tooltips <svg><use xlinkHref="assets/svg/icons.svg#icon-question-sign"></use></svg> located throughout the tool to assist in a common understanding of the questions being asked.</p>
                <p>The input of information takes place in four separate sections, and once completed you can view results. Please click on each section below to learn more:</p>
                <h3>Sections within the Calculator:</h3>

                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active" onClick={this.changeTab.bind(this, 0)}><a href="#" role="tab" data-toggle="tab">Section 1: Standard</a></li>
                  <li role="presentation" onClick={this.changeTab.bind(this, 1)}><a href="#" role="tab" data-toggle="tab">Section 2: Term</a></li>
                  <li role="presentation" onClick={this.changeTab.bind(this, 2)}><a href="#" role="tab" data-toggle="tab">Section 3: Lease Details</a></li>
                  <li role="presentation" onClick={this.changeTab.bind(this, 3)}><a href="#" role="tab" data-toggle="tab">Section 4: Rent Details</a></li>
                  <li role="presentation" onClick={this.changeTab.bind(this, 4)}><a href="#" role="tab" data-toggle="tab">Section 5: View Results</a></li>
                </ul>

                {this.state.activeTab === 0 &&
                    <div className="section">
                        <p>In this section, you will identify the standard that applies to the lease being analyzed. The questions will guide you to:</p>
                        <ul>
                            <li>Identify whether the entity executing the lease reports under U.S. Generally Accepted Accounting Principles (GAAP) or International Financial Reporting Standards (IFRS)</li>
                            <li>Determine whether you want to analyze the lease based upon the current lease accounting standard or the new lease accounting standard</li>
                            <li>Review the criteria to determine the appropriate lease classification</li>
                        </ul>
                        <p>Once the lease has been classified by standard you will be directed to the next stage to enter details for the term of the lease.</p>
                    </div>
                }
                {this.state.activeTab === 1 &&
                    <div className="section">
                        <p>The lease term for purposes of the lease accounting standard may not be what is typically considered the primary term of the lease. In order to determine the appropriate lease term for accounting purposes, you will be asked several questions regarding:</p>
                        <ul>
                            <li>The length of the primary lease term</li>
                            <li>Whether the lease contains any termination and/or renewal options</li>
                            <li>Whether the termination and/or renewal options are “reasonably certain” of being exercised</li>
                        </ul>
                        <p>Once the term of the lease has been determined for accounting purposes, you will be directed to the next stage to enter details for the lease such as area, unit of measure, currency and more.</p>
                    </div>
                }
                {this.state.activeTab === 2 &&
                    <div className="section">
                        <p>In this section you will be asked to input:</p>
                        <ul>
                            <li>The currency denomination of the lease</li>
                            <li>What unit of measurement will be used (square feet or square meters)</li>
                            <li>The net rentable area of the space to be leased</li>
                            <li>The recovery structure of the lease (does the rent paid include reimbursements to the lessor for operating expenses and/or real estate taxes and insurance)</li>
                        </ul>
                        <p>Once the details for the lease have been entered, you will be directed to the next stage to enter financial details such as rent, rent escalations and incremental borrowing rate.</p>
                    </div>
                }
                {this.state.activeTab === 3 &&
                    <div className="section">
                        <p>This is where you will enter the rent to be paid over the term of the lease, including:</p>
                        <ul>
                            <li>The first year’s rent</li>
                            <li>Any increases in the rent over the lease term</li>
                            <li>How any increases in rent are applied (e.g., based on a fixed percentage or on a specific amount per square foot)</li>
                            <li>The incremental borrowing rate</li>
                            <li>Any termination fees associated with the termination option(s) identified in Section 2: Term</li>
                        </ul>
                        <p>Upon completing these four sections, you can View Results in the next section.</p>
                    </div>
                }
                {this.state.activeTab === 4 &&
                    <div className="section">
                        <p>Upon completing these four sections, you will be able to View Results, including the following:</p>
                        <ul>
                            <li>A summary of the key information input for the lease</li>
                            <li>The initial year’s expense and amount to be capitalized on the balance sheet</li>
                            <li>A graph depicting both the cash rent to be paid over the term of the lease, as well as the annual GAAP-related  or IFRS-related expense to be recorded on the company’s profit and loss statement</li>
                            <li>A detailed table that provides: the end-of-year balance for the Right-of-Use Asset and Lease Liability, and the annual expense to be recorded on either a U.S. GAAP or IFRS basis</li>
                        </ul>
                        <p>This section will allow you to personalize the analysis by entering a “Project Name”, “Prepared By” and “Prepared For” information.</p>
                        <p>If you click on “Copy and Edit Lease for Comparison,” the information entered for the initial lease will be copied as the starting point for entering a second lease. You can keep these terms and make minor modifications to determine the sensitivity certain changes have on the financial impact to the financial statements, or you can simply enter information for an entirely different lease to compare with the initial lease.</p>
                        <p>Once finished, by clicking “Print” in the tool you can either print out the results of the analysis or make a PDF version of the results.</p>
                        <p>While this tool is not intended to provide a comprehensive perspective of lease accounting, we hope it will provide you with a better understanding of how the new standards differ from the existing lease accounting standards and the interdependence of the various terms and structure of a lease and their impact on a company’s financial statements.</p>
                        <p>Thank you!</p>
                    </div>
                }
            </div>
        );
    }
}

export default ToolOverview;