import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userData, updateUser } from '../redux/userReducer';
import axios from 'axios';
import '../styles/changeEmail.css';


function ChangeEmail(props) {
    // REQUEST BODY BEING SENT
    const [ email, setEmail ] = useState('');
    
    // FAILED/SUCCESS ERROR
    const [ failed, setFailed ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    // INVALID EMAIL
    const [ emailError, setEmailError ] = useState('');

    const popup = () => {
        setTimeout(() => {
            setFailed(false);
            setSuccess(false);
        }, 6000);
    }
    
    const changeEmail = async (e) => {
        e.preventDefault();

        popup();

        let body = { email };
            await axios
                    .put('/auth/changeEmail', body)
                    .then(res => {
                        props.updateUser(email, res.data.user_id);
                        // history.replace(`/Account/${user.username}`);
                        setSuccess(true);
                    })
                    .catch(err => {
                        console.log(err)
                        setFailed(true);
                    })
    }

    const checkEmail = () => {
        if (email.includes('@' && '.')) {
            setEmailError('');
            return;
        } else {
            setEmailError('*Invalid email address*')
        }
    }

    return (
        <div className='ChangeEmail'>
            <div className='change-email-form'>
                <span>Change your email</span>
                <form onSubmit={changeEmail}>
                    <p>{emailError}</p>
                    <input
                        type='text'
                        placeholder='Enter new email'
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyUp={checkEmail}
                        required
                    />
                    <button type='submit'>Change</button>
                </form>
            </div>
            {
                success
                ?
                <div className='added'>
                    <div>
                        <p>Email changed successfully! To see your changes, sign out, then log back in. &#9989;</p>
                    </div>
                </div>
                :
                null
            }
            {
                failed
                ?
                <div className='failed'>
                    <div>
                        <p>A user with this email already exists. &#10060;</p>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { userData, updateUser })(ChangeEmail);