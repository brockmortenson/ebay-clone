import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../redux/userReducer';
import axios from 'axios';
import '../styles/navOne.css';

function NavOne(props) {
    const [ name, setName ] = useState('closed');
    const [ newUser, setNewUser ] = useState();
    const [ loggedOut, setLoggedOut ] = useState(false);


    const history = useHistory();


    let userLoggedIn = props.loggedIn;
    let currentUser = props.currentUser;

    useEffect(() => {
        if (userLoggedIn) {
            setNewUser(currentUser.username)
            setLoggedOut(false)
        }
    }, [userLoggedIn, currentUser])

    const logoutSuccess = () => {
        setTimeout(() => {
            setLoggedOut(false);
        }, 2000);
    }

    const logout = () => {
        try {
            axios
                .delete('/auth/logout')
                props.userLogout();
                history.replace('/');
                setLoggedOut(true)
                logoutSuccess();
        } catch (err) {
            console.log(err);
        }
    }

    
    const handleAccount = () => {
        if (userLoggedIn) {
            history.push(`/Account/${newUser}`)
        }
    }

    return (
        <div className='NavOne'>
            {
            userLoggedIn
            ?
            <div
                className='conditional'
                onMouseEnter={ () => setName('open') }
                onMouseLeave={ () => setName('closed') }
            >
                <section>
                    <span>Hi, {newUser}</span>
                    <p><i className='arrow2'></i></p>
                </section>
                {
                    !props.open
                    ?
                    <div className={name} >
                        <span id='email'>{currentUser.email}</span>
                        <p onClick={handleAccount}>My Account</p>
                        <p onClick={logout}>Logout</p>
                    </div>
                    :
                    <div>
                        <br />
                        <p className='mobile-logout' onClick={logout}>Logout</p>
                    </div>
                }
            </div>
            :
            <div>Welcome to SGGE!
                {/* <Link
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
                </Link> */}
            </div>
            }
            {
                loggedOut
                ?
                <div className='user-logged-out'>
                    <div>
                        <span>Successfully logged out &#9989;</span>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userLogout })(NavOne);