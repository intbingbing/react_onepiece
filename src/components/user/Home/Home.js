import React, { Component } from 'react';
import "./Home.less";
import { InputNumber } from 'antd';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }

    componentDidMount() {
    }

    onChange=(value)=> {
        console.log('changed', value);
    }

    render() {
        return (
            <div className='home'>

            </div>
        );
    }
}