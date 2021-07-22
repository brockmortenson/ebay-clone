import axios from 'axios';

// INITIAL STATE
const initialState = {
    cart: {}
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
    // let data = axios.get(`https://fakestoreapi.com/products/${id}`)
    //     .then(res => console.log(res.data))
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

        case addToCart:
            return {
                ...state,
                cart: action.payload
            }
            
        default: 
            return state;
    }
}