import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import { useHistory } from 'react-router-dom';
import store from '../redux/store';
import '../styles/register.css';

const Register = (props) => {
    // REGISTER STATE
    const [ data, setData ] = useState({
        email: '',
        username: '',
        password: '',
        birthday: ''
    });

    const [ user, setUser ] = useState();

    // REGISTER ERROR
    const [ registerError, setRegisterError ] = useState('');

    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();
        let body = {
            email: data.email,
            username: data.username,
            password: data.password,
            birthday: data.birthday
        };
        try {
            const response = await axios
                    .post('/auth/register', body)
                    props.userData()
                    setUser(response.data)
        } catch (err) {
            console.log(err);
            setRegisterError('*A user with this email already exists*')
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const checkEmail = () => {
        if (data.email.includes('@' && '.')) {
            setRegisterError('')
            return;
        } else {
            setRegisterError('*Invalid email address*')
        }
    }

    let isLoading = store.getState().user.pending;
    // console.log(isLoading)

    return (
        <div className='Register'>
            <br />
            register component
            { user ? <div>Hello, {user.username}</div> : null }
            <div>{registerError}</div>
            <form onSubmit={register}>
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                    value={data.email}
                    onKeyUp={checkEmail}
                    required
                />
                <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    onChange={handleChange}
                    value={data.username}
                    required
                />
                <div>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        minLength='6'
                        required
                    />
                    <p>Password must be at least 6 characters</p>
                </div>
                <input
                    type='date'
                    // placeholder='Email'
                    name='birthday'
                    onChange={handleChange}
                    value={data.birthday}
                    required
                />
                <button type='submit'>Create Account</button>
            </form>
            <div>{ isLoading ? <h2>..................loading................</h2> : null }</div>
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Register);