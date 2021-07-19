import React from 'react';
import { Link } from 'react-router-dom';
import store from '../redux/store';
import '../styles/navOne.css';

function NavOne(props) {

    let user = store.getState().user.user.username;

    return (
        <div className='NavOne'>
            {
            props.profileName
            ?
            <div>Hello, {user}</div>
            :
            <div>Hi! {' '}
                <Link to='/Login'>Login</Link>
                {' '} or {' '}
                <Link to='/Register'>Register</Link>
            </div>
            }
        </div>
    );
}

export default NavOne;