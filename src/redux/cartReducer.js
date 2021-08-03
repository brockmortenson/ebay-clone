// INITIAL STATE
const initialState = {
    cart: [],
    pendingAdd: null
};

// ACTION CREATOR
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADJUST_QUANTITY = 'ADJUST_QUANTITY';


// ACTION TYPES
export const getCart = (cart) => {
    return {
        type: GET_CART,
        payload: cart
    };
}

export const addToCart = () => {
    return {
        type: ADD_TO_CART,
        // payload: itemID
    }
}

export const removeFromCart = (itemID) => {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id: itemID
        }
    }
}

export const adjustQuantity = (itemID, value) => {
    return {
        type: ADJUST_QUANTITY,
        payload: {
            id: itemID,
            qty: value,
        }
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
            };

        case ADD_TO_CART + '_FULFILLED':
            console.warn('Reducer:', action)
            return {
                ...state,
                cart: action.payload,
                pendingAdd: false
            };

        case REMOVE_FROM_CART:
            return state.filter(cart => cart.id !== action.payload.id)
            
        default: 
            return state;
    }
}