import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin } from '../redux/userReducer';

const Login = (props) => {

}

const mapStateToProps = (state) => { return state }
export default connect(mapStateToProps, { userLogin })(Login);