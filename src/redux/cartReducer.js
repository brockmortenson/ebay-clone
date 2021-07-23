import axios from 'axios';

// INITIAL STATE
const initialState = {
    cart: [],
    pendingAdd: null
    //cart: []
};

// ACTION TYPES
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const getCart = (cart) => {
    return {
        type: GET_CART,
        payload: cart
    };
}

export const addToCart = (cart) => {
    // let data = axios.post(`/api/item`)
    //     .then(res => res.data)
    console.log(cart)
    return {
        type: ADD_TO_CART,
        payload: cart
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cart: action.payload
            };

        case ADD_TO_CART + '_PENDING':
            return {
                pendingAdd: true
            }

        case ADD_TO_CART + '_FULFILLED':
            return {
                cart: action.payload,
                pendingAdd: false
            }
            
        default: 
            return state;
    }
}