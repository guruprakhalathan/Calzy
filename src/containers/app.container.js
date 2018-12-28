import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sim } from './sim.container';
import Header from '../components/header';
import Footer from '../components/footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Sim {...this.props} />
                <Footer {...this.props}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state);
}

export default connect(mapStateToProps)(App);
