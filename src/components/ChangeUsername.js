import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userData } from '../redux/userReducer';
import axios from 'axios';
import '../styles/changeUsername.css';
import { useHistory } from 'react-router-dom';

function ChangeUsername(props) {
    // REQUEST BODY BEING SENT
    const [ username, setUsername ] = useState('');
    
    // FAILED/SUCCESS ERROR
    const [ failed, setFailed ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    // LOADING
    const [ loading, setLoading ] = useState(false);

    const history = useHistory();

    const popup = () => {
        setTimeout(() => {
            setFailed(false);
            setSuccess(false);
        }, 6000);
    }
    
    const changeUsername = async (e) => {
        e.preventDefault();

        popup();
        setLoading(true);

        let body = { username };
            try {
                await axios
                    .put('/auth/changeUsername', body)
                    // history.replace(`/Account/${user.username}`);
                    props.userData();
                    setSuccess(true);
                    setUsername('');
                    setLoading(false);
            } catch (err) {
                console.log(err);
                setFailed(true);
                setLoading(false);
            }

        e.target.reset();
    }

    return (
        <div className='ChangeUsername'>
            {/* { !loading ? <div className='change-loading'><div></div><div></div><div></div><div></div></div> : null } */}
            <div className='change-username-form'>
                <section>
                    <p onClick={() => history.goBack()}>&#8678;</p>
                </section>
                <span>Change your username</span>
                <form onSubmit={changeUsername}>
                    <input
                        type='text'
                        placeholder='Enter new username'
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength='10'
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