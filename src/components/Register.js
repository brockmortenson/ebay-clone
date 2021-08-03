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

    // CONFIRM PASSWORD
    const [ matchPass, setMatchPass ] = useState('')
    
    // PASSWORD COUNT
    const [ count, setCount ] = useState(0);

    const [ loading, setLoading ] = useState(false);

    // REGISTER ERROR
    const [ registerError, setRegisterError ] = useState('');


    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();

        setLoading(true);
        
        let body = {
            email: data.email,
            username: data.username,
            password: data.password,
            birthday: data.birthday
        };
        try {
            await axios
                    .post('/auth/register', body);
                    props.userData();
                    setLoading(false);
                    history.push('/');
        } catch (err) {
            console.log(err);
            setRegisterError('*A user with this email already exists*');
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const checkEmail = () => {
        if (data.email.includes('@' && '.')) {
            setRegisterError('');
            return;
        } else {
            setRegisterError('*Invalid email address*')
        }
    }

    return (
        <div className='Register'>
            <div className='reg-form'>
                <span>Create Your Account</span>
                <form onSubmit={register}>
                    <p>{registerError}</p>
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
                        maxLength='10'
                        required
                    />
                    <div className='pass-div'>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            onKeyUp={e => setCount(e.target.value.length)}
                            value={data.password}
                            minLength='6'
                            required
                        />
                        {
                            count < 6
                            ?
                            <p style={{ color: 'red' }}>
                                Password must be at least 6 characters
                            </p>
                            :
                            <p>&#9989;</p>
                        }
                        <input
                            type='password'
                            placeholder='Confirm your password'
                            name='confirm'
                            onChange={e => setMatchPass(e.target.value)}
                            value={matchPass}
                            required
                        />
                        {
                            matchPass === data.password && matchPass !== ''
                            ?
                            <span>&#9989;</span>
                            :
                            <span>Passwords do not match</span>
                        }
                    </div>
                    <input
                        type='date'
                        name='birthday'
                        onChange={handleChange}
                        value={data.birthday}
                        required
                    />
                    <button type='submit'>Create Account</button>
                    <div className='account-login'>
                        <p>Have an account?</p>
                        <span onClick={() => history.push('/Login')}>Log in.</span>
                    </div>
                </form>
            </div>
            <div>
                {
                    loading
                    ?
                    <div className='loading'><div></div><div></div><div></div><div></div></div>
                    :
                    null
                }
            </div>
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Register);