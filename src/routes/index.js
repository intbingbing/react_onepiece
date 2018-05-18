import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@/pages/Login'
import Homepage from '@/pages/Homepage'
import NotFound from '@/pages/NotFound'
import Home from '@/components/user/Home'
import KLineCharts from '@/components/charts/KLineCharts'

export default class RootRouter extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from='/' to='/homepage'/>
                    <Route path="/homepage" component={Homepage} />
                    <Route path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

const routes = [
    {
        path: '/homepage/user/home',
        component: Home
    },
    {
        path: '/homepage/charts/k_line_charts',
        component: KLineCharts
    }
];

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);

export const routeMap = routes.map((route, i) => (
    <RouteWithSubRoutes key={i} {...route}/>
));