import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../redux/userReducer';
import '../styles/navOne.css';
import axios from 'axios';

function NavOne(props) {
    const [ name, setName ] = useState('closed')
    // console.log(name)

    const history = useHistory();

    const logout = () => {
        try {
            axios
                .delete('/auth/logout')
                props.userLogout();
                history.replace('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='NavOne'>
            {
            props.loggedIn
            ?
            <div
                className='conditional'
                onMouseEnter={ () => setName('open') }
                onMouseLeave={ () => setName('closed') }
            >
                Hi, {props.userName} &#11167;
                <div className={name} >
                    <span id='email'>{props.email}</span>
                    {/* <Link>My Account</Link> */}
                    <p>My Account</p>
                    <p onClick={logout}>Logout</p>
                </div>
            </div>
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

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userLogout })(NavOne);