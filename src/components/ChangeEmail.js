import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import axios from 'axios';
import '../styles/changeEmail.css';
import { useHistory } from 'react-router-dom';


function ChangeEmail(props) {
    // REQUEST BODY BEING SENT
    const [ email, setEmail ] = useState('');
    
    // FAILED/SUCCESS ERROR
    const [ failed, setFailed ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    // INVALID EMAIL
    const [ emailError, setEmailError ] = useState('');

    const [ loading, setLoading ] = useState(false);

    const history = useHistory();
    
    const popup = () => {
        setTimeout(() => {
            setFailed(false);
            setSuccess(false);
        }, 6000);
    }
    
    const changeEmail = async (e) => {
        e.preventDefault();

        popup();
        setLoading(true);

        let body = { email };
            try {
                await axios
                    .put('/auth/changeEmail', body)
                    props.userData();
                    setSuccess(true);
                    setLoading(false);
                    // history.replace(`/Account/${user.username}`);
            } catch (err) {
                console.log(err);
                setFailed(true);
                setLoading(false);
            }

        e.target.reset();
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
                <section>
                    <p onClick={() => history.goBack()}>&#8678;</p>
                </section>
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
                    <button type='submit'>
                        {
                            loading
                            ?
                            <div className='change-loading'>
                                <div></div><div></div><div></div><div></div>
                            </div>
                            :
                            'Change'
                        }
                    </button>
                </form>
            </div>
            {
                success
                ?
                <div className='added'>
                    <div>
                        <p>Email changed successfully! &#9989;</p>
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

export default connect(mapStateToProps, { userData })(ChangeEmail);