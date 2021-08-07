import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { userData, updateUser } from '../redux/userReducer';
import '../styles/changePass.css';

function ChangePass(props) {
    const [ password, setPassword ] = useState(''); 
    const [ newPassword, setNewPassword ] = useState(''); 

    const history = useHistory();

    const changePassword = async (e) => {
        e.preventDefault();

        let body = { password };
        // try {
            await axios
                    .put('/auth/change', body)
                    // props.userData()
                    // history.push('/')
                    // console.log(newPassword)
                    .then(res => {
                        console.log(res.data)
                        props.updateUser(password, res.data.user_id)

                    })
                    .catch(err => console.log(err))
        // } catch (err) {
        //     console.log(err);
        // }
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
            <button>Delete</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { userData, updateUser })(ChangePass);