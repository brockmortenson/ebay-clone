import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import { useHistory, Link } from 'react-router-dom';
import store from '../redux/store';
import '../styles/login.css';

const Login = (props) => {
    // LOGIN STATE
    const [ data, setData ] = useState({
        username: '',
        password: ''
    });

    const [ user, setUser ] = useState()

    
    // LOGIN ERROR
    const [ loginError, setLoginError ] = useState('');
    
    // const history = useHistory();
    
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
            Login component hiiii
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
                <button type='submit'>Login { user && !isLoading ? <Link to='/'></Link> : null }</button>
            </form>
            <div>{ isLoading ? <h2>loading................</h2> : null }</div>
            { user ? <div>Hello, {user.username}</div> : null }
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Login);