import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../redux/userReducer';
import axios from 'axios';
import '../styles/navOne.css';

function NavOne(props) {
    const [ name, setName ] = useState('closed')

    // let userProfile = props.user.user.username

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

    let user = props.userProfile.username;

    const handleAccount = () => {
        history.push(`/Account/${user}`)
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
                    <p onClick={handleAccount}>My Account</p>
                    <p onClick={logout}>Logout</p>
                </div>
            </div>
            :
            <div>Hi! {' '}
                <Link
                    to='/Login'
                    className='auth'
                    style={{ textDecoration: 'none' }}
                >
                    Login
                </Link>
                {' '} or {' '}
                <Link
                    to='/Register'
                    className='auth'
                    style={{ textDecoration: 'none' }}
                >
                    Register
                </Link>
            </div>
            }
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userLogout })(NavOne);