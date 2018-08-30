import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../widget/asyncComponent'

const Login = asyncComponent(() => import('@/pages/Login/Login'))
const Homepage = asyncComponent(() => import('@/pages/Homepage/HomePage'))
const NotFound = asyncComponent(() => import('@/pages/NotFound/NotFound'))

export default class RootRouter extends Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect from='/' exact to='/homepage'/>
                    <Route path="/login" component={Login} />
                    <Route path="/homepage" component={Homepage} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

// const routes = [
//     {
//         path: '/homepage/user/home',
//         component: Home
//     },
//     {
//         path: '/homepage/charts/k_line_charts',
//         component: KLineCharts
//     }
// ];

// const RouteWithSubRoutes = (route) => (
//     <Route path={route.path} render={props => (
//         <route.component {...props} routes={route.routes}/>
//     )}/>
// );

// export const routeMap = routes.map((route, i) => (
//     <RouteWithSubRoutes key={i} {...route}/>
// ));