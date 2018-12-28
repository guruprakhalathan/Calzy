import React, { Component } from 'react';
import { loadSteps, routeView } from '../actions/nav-actions';
import { loadAllQuetions } from '../actions/questions-actions';
import Setup from '../components/setup';
import LandingPage from '../components/landing-page';
import Result from '../components/result';
import ToolOverview from '../components/tool-overview';

export class Sim extends Component {
    componentWillMount() {
        let hash = window.location.hash;
        window.onhashchange = () => {
            this.props.dispatch(routeView(window.location.hash));
        };
        this.props.dispatch(routeView(hash));
        this.props.dispatch(loadSteps());
        this.props.dispatch(loadAllQuetions());
    }

    getMainBlock() {
        let page = this.props.nav ? this.props.nav.page : null;
        switch (page) {
            case '#landing-page':
                return <LandingPage />;
            case '#setup':
                return <Setup {...this.props} />;
            case '#result-page':
                return <Result {...this.props} />;
            case '#tool-overview':
                return <ToolOverview />;
            default:
                return <div></div>;
        }
    }

    render() {
        return (
            <div className="root-container">
                <div className="main-container">
                    <div className="col-xs-12 nopadding">
                        {this.getMainBlock()}
                    </div>
                </div>
            </div>
        );
    }
}
