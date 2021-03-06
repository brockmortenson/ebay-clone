import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Electronics from './components/Electronics';
import Men from './components/Men';
import Women from './components/Women';
import Jewelry from './components/Jewelry';
import CartItem from './components/CartItem';
import Cart from './components/Cart';
import ProductView from './components/ProductView';
import Account from './components/Account';
import SavedItems from './components/SavedItems';
import About from './components/About';
import Contact from './components/Contact';
import ChangePass from './components/ChangePass';
import ChangeEmail from './components/ChangeEmail';
import ChangeUsername from './components/ChangeUsername';


export default (
    <Switch>
        <Route exact path='/' name='Home' component={Landing} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
        <Route path='/Electronics' component={Electronics} />
        <Route path='/Men' component={Men} />
        <Route path='/Women' component={Women} />
        <Route path='/Jewelry' component={Jewelry} />
        <Route path='/CartItem/:id' component={CartItem} />
        <Route path='/Cart' component={Cart} />
        <Route path='/ProductView/:id' component={ProductView} />
        <Route path='/Account/:id' component={Account} />
        <Route path='/SavedItems' component={SavedItems} />
        <Route path='/About' component={About} />
        <Route path='/Contact' component={Contact} />
        <Route path='/ChangePass' component={ChangePass} />
        <Route path='/ChangeEmail' component={ChangeEmail} />
        <Route path='/ChangeUsername' component={ChangeUsername} />
    </Switch>
)