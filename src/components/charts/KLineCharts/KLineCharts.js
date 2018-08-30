import React, { Component } from 'react';
import "./KLineCharts.less";
import * as echarts from 'echarts/lib/echarts';
import '../../../../node_modules/_echarts@4.1.0@echarts/lib/chart/candlestick';
import '../../../../node_modules/_echarts@4.1.0@echarts/lib/chart/line';
import '../../../../node_modules/_echarts@4.1.0@echarts/lib/component/tooltip';
import '../../../../node_modules/_echarts@4.1.0@echarts/lib/component/title';
import '../../../../node_modules/_echarts@4.1.0@echarts/lib/component/toolbox';
import '../../../../node_modules/_echarts@4.1.0@echarts/lib/component/dataZoom';

export default class KLineCharts extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log('KLineCharts componentWillMount')
    }

    componentDidMount() {
        this.showEcharts();
    }

    async showEcharts() {
        let data = (await this.$api.getEchartsKLine()).data;
        let option = {
            title: {
                text: '上证指数'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: [ 'MA5', 'MA10', 'MA20', 'MA30']
            },
            xAxis: {
                data: [...data.map(value => value[0])]
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            grid: {
                bottom: '10%'
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    start: 50,
                    end: 100
                }
            ],
            series: [{
                type: 'k',
                data: [...data.map(value => value.slice(1))]
            }]
        };

        this.chart = echarts.init(document.getElementById('candlestick'));
        this.chart.setOption(option);
        window.onresize=this.chart.resize;
        this.setState({});
    }
    render() {
        return (
            <div id='candlestick'>

            </div>
        );
    }
}