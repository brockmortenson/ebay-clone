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

    // THE USER
    const [ user, setUser ] = useState();

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
            const response = await axios
                .post('/auth/login', body);
                props.userData();
                setUser(response.data);
                setLoading(false);
                history.push('/') ;
        } catch (err) {
            console.log(err);
            setLoginError('*Incorrect username or password*')
        }
    }
            
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    // let isLoading = store.getState().user.pending;
    // console.log(isLoading);
            
    return (
        <div className='Login'>
            <br />
            {loginError}
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
            <div >
                {
                    loading
                    ?
                    <div className='loading'><div></div><div></div><div></div><div></div></div>
                    :
                    null
                    }
            </div>
            {
                user
                ?
                <div>Hello, {user.username}</div>
                :
                null
            }
        </div>
    );
}

// REDUX STATE
const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { userData })(Login);