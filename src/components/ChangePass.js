import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { userData } from '../redux/userReducer';
import '../styles/changePass.css';

function ChangePass(props) {
    const [ password, setPassword ] = useState(''); 
    const [ newPassword, setNewPassword ] = useState(''); 

    const history = useHistory();

    const changePassword = async (e) => {
        e.preventDefault();

        let body = { password, newPassword };
        try {
            await axios
                    .put('/auth/change', body)
                    props.userData()
                    history.push('/')
                    console.log(newPassword)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='ChangePass'>
            <form onSubmit={changePassword}>
                <input
                    type='text'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type='text'
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type='submit'>Change</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { userData })(ChangePass);