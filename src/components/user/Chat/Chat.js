import React, { Component } from 'react';
import "./Chat.less";
import { InputNumber } from 'antd';

export default class Chat extends Component {
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
            <div className='chat'>
                <h1>chat</h1>
            </div>
        );
    }
}