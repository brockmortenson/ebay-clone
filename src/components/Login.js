import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';

const Login = (props) => {
    // LOGIN STATE
    const [ data, setData ] = useState({
        username: '',
        password: ''
    });

    const [ loading, setLoading ] = useState(false);
    
    // LOGIN ERROR
    const [ loginError, setLoginError ] = useState('');
    
    const history = useHistory();
    
    const login = async (e) => {
        e.preventDefault();

        setLoading(true);

        let body = {
            username: data.username,
            password: data.password
        };
        try {
            await axios
                .post('/auth/login', body);
                props.userData();
                setLoading(false);
                history.push('/') ;
        } catch (err) {
            console.log(err);
            setLoginError('*Incorrect username or password*');
            setLoading(false);
        }
    }
            
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
            
    return (
        <div className='Login'>
            <div className='form'>
                <span>Login To Your Account</span>
                <form onSubmit={login}>
                    <p>{loginError}</p>
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
                    <span>Forgot Password?</span>
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

export default connect(mapStateToProps, { userData })(Login);