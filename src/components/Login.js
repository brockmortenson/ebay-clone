import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import { useHistory, Link } from 'react-router-dom';
import store from '../redux/store';

const Login = (props) => {
    // LOGIN STATE
    const [ data, setData ] = useState({
        username: '',
        password: ''
    });

    const [ user, setUser ] = useState()

    
    // LOGIN ERROR
    const [ loginError, setLoginError ] = useState('');
    
    const history = useHistory();
    
    const login = async (e) => {
        e.preventDefault();
        let body = {
            username: data.username,
            password: data.password
        };
        try {
            const response = await axios
            .post('/auth/login', body);
            props.userData()
            setUser(response.data)
        } catch (err) {
            console.log(err);
            setLoginError('*Incorrect username or password*')
        }
    }
            
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    let isLoading = store.getState().user.pending;
            
    return (
        <div className='Login'>
            <br />
            <br />
            Login component hiiii
            { user ? <div>Hello, {user.username}</div> : null }
            <form onSubmit={login}>
            <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    onChange={handleChange}
                    value={data.username}
                    autoComplete='on'
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
                    value={data.password}
                    required
                />
                <button type='submit'>Login</button>
            </form>
            <section>
                <div>
                    <h1>Don't have an account?</h1>
                    <div>
                        <Link to='/Register'><p>Sign Up</p></Link>
                        <p>instead</p>
                    </div>
                </div>
            </section>
            <div>{ isLoading ? <h2>loading................</h2> : null }</div>
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Login);