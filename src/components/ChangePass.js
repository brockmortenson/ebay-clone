import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userData, updateUser } from '../redux/userReducer';
import '../styles/changePass.css';

function ChangePass(props) {
    // REQ BODY
    const [ password, setPassword ] = useState('');
    
    // FAILED/SUCCESS ERROR
    const [ failed, setFailed ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    // SHOW PASSWORD
    const [ show, setShow ] = useState(false);
    const [ type, setType ] = useState('password');

    // LOADING
    const [ loading, setLoading ] = useState(false);

    const history = useHistory();

    const popup = () => {
        setTimeout(() => {
            setFailed(false);
            setSuccess(false);
        }, 6000);
    }
    
    const changePassword = async (e) => {
        e.preventDefault();

        popup();
        setLoading(true);

        let body = { password };
        try {
            await axios
                    .put('/auth/change', body)
                    props.updateUser();
                    setSuccess(true);
                    setLoading(false);
        } catch (err) {
            console.log(err);
            setFailed(true);
            setLoading(false);
        }

        e.target.reset();
    }

    const showPassword = () => {
        console.log(show);
        setShow(!show);
        
        if (show) {
            setType('password');
        } else setType('text');        
    }

    return (
        <div className='ChangePass'>
            <div className='change-password-form'>
                <section>
                    <p onClick={() => history.goBack()}>&#8678;</p>
                </section>
                <span>Change your password</span>
                <form onSubmit={changePassword}>
                    <input
                        type={type}
                        placeholder='Enter new password'
                        onChange={(e) => setPassword(e.target.value)}
                        minLength='6'
                        required
                    />
                    {
                        show
                        ?
                        <span onClick={showPassword}>Hide Password</span>
                        :
                        <span onClick={showPassword}>Show Password</span>
                    }
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
                        <p>Password changed successfully! &#9989;</p>
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
                        <p>An error ocurred. Please try again later &#10060;</p>
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

export default connect(mapStateToProps, { userData, updateUser })(ChangePass);