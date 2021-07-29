import React, { useState } from 'react';
import store from '../redux/store';
import '../styles/account.css';

function Account() {
    const [ showPass, setShowPass ] = useState(false);
    
    let user = store.getState().user.user

    const handleShow = () => {
        setShowPass(!showPass)
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
                        <p>{user.birthday}</p>
                    </div>
                    <div>
                        <h2>Account Created On:</h2>
                        <p>{user.created_on}</p>
                    </div>
                    <div className='change'>
                        <h3>Change Username</h3>
                        <h3>Change Email</h3>
                        <h3>Change Password</h3>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Account;