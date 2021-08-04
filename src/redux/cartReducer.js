// INITIAL STATE
const initialState = {
    cart: [],
    cartCount: 0
};

// ACTION CREATOR
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADJUST_QUANTITY = 'ADJUST_QUANTITY';


// ACTION TYPES
export const addToCart = (itemID) => {
    return {
        type: ADD_TO_CART,
        payload: itemID
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
        case ADD_TO_CART:
            state.cartCount += 1;
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };

        case REMOVE_FROM_CART:
            return state.filter(cart => cart.id !== action.payload.id)
            
        default: 
            return state;
    }
}