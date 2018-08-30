import React, { Component } from 'react';
import "./UserAvatar.less";
import {Link} from 'react-router-dom'
import {Icon, Avatar, Badge, List, Popover } from 'antd';

export default class UserAvatar extends Component {
    componentWillMount() {

    }

    componentDidMount() {
    }

    jumpRoute=(value)=> {
        console.log('changed', value);
    }

    render() {
        const { user } = this.props
        const data = [
            '主页',
            '资料',
            '退出',
        ]
        const icon = ['home','idcard','poweroff']
        const routeList = ['','/homepage/avatar/info','']
        const list = (<List
            size="small"
            dataSource={data}
            renderItem={(item, index) => (
                <Link to={`${routeList[index]}`}>
                    <List.Item>
                            <Icon type={icon[index]}/>{item}
                    </List.Item>
                </Link>
            )}
        />)

        return (
            <Popover placement="bottomRight" overlayClassName='avatar-popup' content={list} trigger="click">
                <Badge dot={true}>
                    <Avatar shape = 'square' src={user.avatar} style={{color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>
                        {user.avatar.length === 0 && user.name[0]}
                    </Avatar>
                </Badge>
            </Popover>
        );
    }
}