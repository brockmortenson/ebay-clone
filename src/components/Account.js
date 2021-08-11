import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../redux/userReducer';
import axios from 'axios';
import '../styles/account.css';

function Account(props) {

    const history = useHistory();

    const [ popup, setPopup ] = useState(false);

    const [ birthday, setBirthday ] = useState('');
    const [ createdOn, setCreatedOn ] = useState('');
    
    let user = props.user.user

    useEffect(() => {
        setPopup(false);
        setBirthday(user.birthday.substring(0, 10));
        setCreatedOn(user.created_on.substring(0, 10));
    }, [])

    const deleteAccount = async (e) => {
        e.preventDefault();

        let id = props.user.user.user_id;

        try {
            await axios
                .delete(`/auth/delete/${id}`)
                history.push('/');
                props.userLogout();
                alert('Account has been deleted');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='Account'>
            <p>MY ACCOUNT</p>
            <section>
                <div>
                    <div>
                        <h2>Username:</h2> 
                        <p>{user.username}</p>
                    </div>
                    <div>
                        <h2>Email:</h2>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h2>Birthday:</h2>
                        <p>{birthday}</p>
                    </div>
                    <div>
                        <h2>Account Created On:</h2>
                        <p>{createdOn}</p>
                    </div>
                    <div className='change'>
                        <h3 onClick={() => history.push('/ChangeUsername')}>Change Username</h3>
                        <h3 onClick={() => history.push('/ChangeEmail')}>Change Email</h3>
                        {/* <h3 onClick={() => alert('Work in progress')}>Change Password</h3> */}
                    </div>
                    <button onClick={() => setPopup(true)}>Delete Account</button>
                    {
                        popup
                        ?
                        <span className='popup'>
                            <div>
                                <div>
                                    <p onClick={() => setPopup(false)}>X</p>
                                    <p>Are you sure you want to delete your account?</p>
                                </div>
                                <div>
                                    <button onClick={() => setPopup(false)}>Cancel</button>
                                    <button onClick={deleteAccount}>Yes I'm Sure</button>
                                </div>
                            </div>
                        </span>
                        :
                        null
                    }
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { userLogout })(Account);