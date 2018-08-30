import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
//import { routeMap } from '@/routes'
import Home from '@/components/user/Home/Home'
import Chat from '@/components/user/Chat/Chat'
import NotFound from '@/pages/NotFound/NotFound'
import KLineCharts from '@/components/charts/KLineCharts/KLineCharts'
import UserAvatar from '@/components/UserAvatar/UserAvatar'
import UserInfo from '@/components/UserInfo/UserInfo'
import "./HomePage.less";
import { Layout, Menu, Breadcrumb, Icon, Spin, message } from 'antd';
import xiao from '@/static/img/xiao.png';
import cloud from '@/static/img/cloud.png';
import * as langLib from '../../widget/language'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { action as user } from '@/store/user'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

let mapStateToProps = state =>({
    user: state.user
});

let mapDispatchToProps = dispatch => bindActionCreators({
    ...user
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            width: 200,
            logo: xiao,
            routeMapName:{
                user:'用户',
                home:'主页',
                charts:'图表',
                k_line_charts:'K线图',
            }
        };
    }

    async componentDidMount() {
        let {isLogin} = this.props.user
        if ( !isLogin ) {
            if( localStorage.getItem('token') ){
                let res = await this.$api.quicklogin()
                if(res.code !== 0){
                    this.props.history.push('/login')
                    message.error(res.msg)
                    localStorage.clear()
                }else{
                    res.data.isLogin = true
                    this.props.setUser(res.data)
                }
            }else{
                this.props.history.push('/login')
                localStorage.clear()
            }
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
        const { user } = this.props
        return (
            <Spin tip = "Loading..." spinning = {!user.isLogin} size='large'>
                <Router>
                    <Layout className="homepage-wrapper">
                        <Header className="header" theme='dark'>
                            <div className="logo" style={{width: this.state.width}} ><img src={this.state.logo}/></div>
                            <Menu  theme='dark' mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                            </Menu>
                            <UserAvatar user = {user}>
                            </UserAvatar>
                        </Header>
                        <Layout>
                            <Sider width={200} trigger={null} collapsible collapsed={this.state.collapsed}>
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
                                    style={{ height: '100%', borderRight: 0, overflow: 'auto',paddingBottom: 40 }}>
                                    <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户</span></span>}>
                                        <Menu.Item key="1"><Link to={`${this.props.match.url}/user/home`}>主页</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to={`${this.props.match.url}/user/chat`}>聊天室</Link></Menu.Item>
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
                                    <Switch>
                                        {/* <Route exact path={this.props.match.url} component={Home}/> */}
                                        {/* {routeMap} */}
                                        <Route exact path={`/homepage/user/home`} component={Home}/>
                                        <Route exact path={`/homepage/user/chat`} component={Chat}/>
                                        <Route exact path={`/homepage/charts/k_line_charts`} component={KLineCharts}/>
                                        <Route exact path={`/homepage/avatar/info`} component={UserInfo} user={user}/>
                                        <Redirect exact from='/homepage' to='/homepage/user/home'/>
                                        <Route component={NotFound} />
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Router>
            </Spin>
        );
    }
}