import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import { useHistory } from 'react-router-dom';

const Register = (props) => {
    // REGISTER STATE
    // const [ email, setEmail ] = useState('');
    // const [ password, setPassword ] = useState('');
    // const [ username, setUsername ] = useState('');
    const [ data, setData ] = useState({
        email: '',
        username: '',
        password: '',
        birthday: null
    });

    // REGISTER ERRORS
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
            await axios
                    .post('/auth/register', body)
                    .then(res => {
                        props.userData({
                            username: res.data.username,
                            id: res.data.user_id
                        })
                    })
        } catch (err) {
            console.log(err);
            setRegisterError('*A user with this email already exists*')
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div className='Register'>
            register component
            <br />
            <form onSubmit={register}>
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                    value={data.email}
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
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
                    value={data.password}
                    required
                />
                <input
                    type='date'
                    // placeholder='Email'
                    name='birthday'
                    onChange={handleChange}
                    value={data.birthday}
                    required
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Register);