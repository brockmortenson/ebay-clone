import axios from 'axios';

// INITIAL STATE
const initialState = {
    user: {},
    pending: null,
    isLoggedIn: false
};

// ACTION TYPES
const USER_DATA = 'USER_DATA';
const USER_LOGOUT = 'USER_LOGOUT';
const GET_USER = 'GET_USER';

// ACTION CREATORS
export const userData = () => {
    let data = axios.get('/auth/session')
        .then(res => res.data)
        .catch(err => console.log(err));

        return {
            type: USER_DATA,
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

export const getUser = () => {
    return {
        type: GET_USER
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_DATA + '_PENDING':
            return {
                pending: true
            }
        case USER_DATA + '_FULFILLED':
            return {
                user: action.payload,
                pending: false,
                isLoggedIn: true
            };

        case GET_USER:
            return {
                ...state
            }
        
        case USER_LOGOUT:
            return state;

        default:
            return state;
    }
}
