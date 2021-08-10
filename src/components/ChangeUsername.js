import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userData, updateUser } from '../redux/userReducer';
import axios from 'axios';
import '../styles/changeUsername.css';

function ChangeUsername(props) {
    // REQUEST BODY BEING SENT
    const [ username, setUsername ] = useState('');
    
    // FAILED/SUCCESS ERROR
    const [ failed, setFailed ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    // INVALID EMAIL
    const [ userError, setUserError ] = useState('');

    const popup = () => {
        setTimeout(() => {
            setFailed(false);
            setSuccess(false);
        }, 6000);
    }
    
    const changeUsername = async (e) => {
        e.preventDefault();

        popup();

        let body = { username };
            try {
                await axios
                    .put('/auth/changeUsername', body)
                    // history.replace(`/Account/${user.username}`);
                    props.userData();
                    setSuccess(true);
                    setUsername('');
            } catch (err) {
                console.log(err);
                setFailed(true);
            }
    }

    return (
        <div className='ChangeUsername'>
            <div className='change-username-form'>
                <span>Change your username</span>
                <form onSubmit={changeUsername}>
                    {/* <p>{userError}</p> */}
                    <input
                        type='text'
                        placeholder='Enter new username'
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength='10'
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
                        <p>Username changed successfully! &#9989;</p>
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
                        <p>A user with this username already exists &#10060;</p>
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

export default connect(mapStateToProps, { userData })(ChangeUsername);