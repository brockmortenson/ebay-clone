import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../redux/store';
import '../styles/account.css';

function Account() {

    const history = useHistory();

    const [ birthday, setBirthday ] = useState('');
    const [ createdOn, setCreatedOn ] = useState('');
    
    let user = store.getState().user.user

    useEffect(() => {
        setBirthday(user.birthday.substring(0, 10));
        setCreatedOn(user.created_on.substring(0, 10));
    }, [])

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
                        <h3>Change Username</h3>
                        <h3>Change Email</h3>
                        <h3 onClick={() => history.push('/ChangePass')}>Change Password</h3>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Account;