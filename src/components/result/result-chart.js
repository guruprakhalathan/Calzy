'use strict';
import React, { Component } from 'react';
import { moneyFormat } from '../../services/formatter';
import * as isEqual  from 'lodash.isequal'
const fillArray = (n, offset = 0) => {
    return Array.from(new Array(n), (val, index) => index + offset);
};

class ResultChart extends Component {
    componentDidMount() {
        this.data = this.makeChartData();
        this.createLineChart();
        this.updateChart();
    }

    componentDidUpdate(props) {
        const cashDataBeforeUpdate = this.props.rentArr;
        const cashDataAfterUpdate = props.rentArr;
        const rentExpenseBeforeUpdate = this.props.rentExpense;
        const rentExpenseAfterUpdate = props.rentExpense;
        if (!isEqual(cashDataBeforeUpdate, cashDataAfterUpdate) || !isEqual(rentExpenseBeforeUpdate, rentExpenseAfterUpdate)) {

            this.data = this.makeChartData();
            this.updateChart();
        }
    }

    makeChartData() {
        let rentArr = this.props.rentArr.slice();
        if (!rentArr) {
            rentArr = [];
        }
        if (this.props.addTermFee) {
            rentArr[rentArr.length - 1] += Number(this.props.terminationFee);
        }

        return [
            { name: 'Annual Cash Rent', data: rentArr },
            { name: 'Rent Expense', data: this.props.rentExpense }
        ];
    }

    createLineChart() {
        this.chart = new Contour({
            el: this.refs.chart,
            chart: { margin: { left: this.props.isPrint ? 50 : 0 } },
            line: {
                marker: { enable: true }
            },
            xAxis: {
                labels: {
                    formatter: (d, i) => {
                        return d + 1;
                    }
                },
                tickValues: fillArray(this.data[0].data.length, 0),
                title: 'Years'
            },
            yAxis: {
                labels: {
                    formatter: (d, i) => {
                        return moneyFormat({
                            currency: this.props.currency,
                            decimal: true,
                        }, d.toFixed(0));
                    }
                }
            },
            tooltip: {
                formatter: (d, i) => {
                    let tooltip = moneyFormat({
                        currency: this.props.currency,
                        decimal: true,
                    }, Math.round(d.y).toFixed(0));
                    if (this.props.addTermFee && (d.x === (this.props.rentArr.length - 1))) {
                        tooltip += ' (including ' + this.props.currency + this.props.terminationFee + ' termination fee)';
                    }
                    return tooltip;
                }
            }
        })
            .cartesian()
            .line(this.data)
            .tooltip();
    }

    updateChart() {
        this.chart.setData(this.data);
        if (this.data.length > 1 && this.data[1].data.length) {
            this.chart.render();
        }
    }

    render() {
        return (
            <div className="col-xs-12">
                <div ref="chart"></div>
                <div className="legend">
                    <div className="rent-legend">
                        Annual Cash Rent
                    </div>
                    <div className="expense-legend">
                        {this.props.classification === 'Operating Lease' ? 'Annual P&L Rent Expense' : 'Annual P&L Expense'}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultChart;
