import React, { Component } from 'react';
import "./index.less";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let isLogin = localStorage.getItem('token') && new Date(localStorage.getItem('timeout')) > new Date();
        if ( !isLogin) {
            this.props.history.push('/login')
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                HomePage
            </div>
        );
    }
}