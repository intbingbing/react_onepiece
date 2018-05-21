import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { routeMap } from '@/routes'
import Home from '@/components/user/Home'
import "./index.less";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import xiao from '@/static/img/xiao.png';
import cloud from '@/static/img/cloud.png';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            width: 200,
            logo:xiao,
            routeMapName:{
                user:'用户',
                home:'主页',
                charts:'图表',
                k_line_charts:'K线图',
            }
        };
    }
    componentWillMount() {
        let isLogin = localStorage.getItem('token') && new Date(localStorage.getItem('timeout')) > new Date();
        if ( !isLogin) {
            this.props.history.push('/login');
            localStorage.clear();
        }
    }

    toggle = ()=> {
        this.setState({
            collapsed: !this.state.collapsed,
            width: this.state.width===200?80:200,
            logo: this.state.logo===xiao?cloud:xiao,
        });
    };

    render() {
        let breadcrumb = window.location.pathname.split('/').slice(2);
        let mapName = breadcrumb.map(value => this.state.routeMapName[value]);
        console.log(mapName);
        return (
            <Router>
                <Layout className="wrapper">
                    <Header className="header" theme='dark'>
                        <div className="logo" style={{width: this.state.width}} ><img src={this.state.logo}/></div>
                        <Menu  theme='dark' mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
                                  style={{ height: '100%', borderRight: 0, overflow: 'auto',paddingBottom: 40 }}>
                                <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户</span></span>}>
                                    <Menu.Item key="1"><Link to={`${this.props.match.url}/user/home`}>主页</Link></Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" /><span>subnav 1</span></span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="area-chart" /><span>subnav 1</span></span>}>
                                    <Menu.Item key="9"><Link to={`${this.props.match.url}/charts/k_line_charts`}>k线图</Link></Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                </SubMenu>
                            </Menu>
                            <div className="trigger" style={{width: this.state.width}} onClick={this.toggle}>
                                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                            </div>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, height: '100%', overflow: 'auto' }}>
                                {/*<Redirect exact from='/homepage' to='/homepage/user/home'/>*/}
                                <Route exact path={this.props.match.url} component={Home}/>
                                {routeMap}
                                {/*<Route path={`${this.props.match.url}/user/home`} component={Home}/>*/}
                                {/*<Route path={`${this.props.match.url}/charts/k_line_charts`} component={KLineCharts}/>*/}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}