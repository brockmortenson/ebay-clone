import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
    </Switch>
)