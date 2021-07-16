import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import { useHistory, Link } from 'react-router-dom';

const Login = (props) => {
    // LOGIN STATE
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // LOGIN ERRORS
    const [ loginError, setLoginError ] = useState('');
    // const [ registerError, setRegisterError ] = useState('');

    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        let body = { email, password };
        try {
            await axios
                    .post('/auth/login', body)
                    props.userData()
                    
        } catch (err) {
            console.log(err);
            setLoginError('*Incorrect username or password*')
        }
    }

    return (
        <div className='Login'>
            Login component hiiii
            <section>
                <p>Don't have an account?<Link to='/Register'><p>Sign Up</p></Link>instead</p>
            </section>
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Login);