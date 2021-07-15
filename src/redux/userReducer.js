import axios from 'axios';

// INITIAL STATE
const initialState = {
    user: {},
    isLoggedIn: false
};

// ACTION TYPES
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const GET_USER = 'GET_USER';

// ACTION CREATORS
export const loginUser = () => {
    let data = axios.get('/auth/session')
        .then(res => res.data)
        .catch(err => console.log(err));

        return {
            type: USER_LOGIN,
            payload: data
        };
}

export const userLogout = () => {
    axios.delete('/auth/logout')
        .then(res => res.data)
        .catch(err => console.log(err));

        return {
            type: USER_LOGOUT
        };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN + '_FULFILLED':
            return {
                user: action.payload,
                isLoggedIn: true
            };
        
        case USER_LOGOUT:
            return state;

        default:
            return state;
    }
}
