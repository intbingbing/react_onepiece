import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from '@/pages/Login'
import HomePage from '@/pages/HomePage'
import NotFound from '@/pages/NotFound'

export default class RootRouter extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={HomePage}>
                        </Route>
                        <Route path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}