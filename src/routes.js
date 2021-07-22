import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Electronics from './components/Electronics';
import Men from './components/Men';
import Women from './components/Women';
import Jewelry from './components/Jewelry';
import Cart from './components/Cart';
import ProductView from './components/ProductView';


export default (
    <Switch>
        <Route exact path='/' name='Home' component={Landing} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
        <Route path='/Electronics' component={Electronics} />
        <Route path='/Men' component={Men} />
        <Route path='/Women' component={Women} />
        <Route path='/Jewelry' component={Jewelry} />
        <Route path='/Cart' component={Cart} />
        <Route path='/ProductView/:id' component={ProductView} />
    </Switch>
)