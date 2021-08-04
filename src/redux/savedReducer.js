// INITIAL STATE
const initialState = {
    saved: [],
};

// ACTION CREATOR
const ADD_TO_SAVED = 'ADD_TO_SAVED';
const REMOVE_FROM_SAVED = 'REMOVE_FROM_SAVED';


// ACTION TYPES
export const addToSaved = (itemID) => {
    return {
        type: ADD_TO_SAVED,
        payload: itemID
    }
}

export const removeFromSaved = (itemID) => {
    return {
        type: REMOVE_FROM_SAVED,
        payload: {
            id: itemID
        }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_SAVED:
            console.warn('Reducer:', action)
            return {
                ...state,
                saved: [...state.saved, action.payload],
            };

        case REMOVE_FROM_SAVED:
            return state.filter(saved => saved.id !== action.payload.id)
            
        default: 
            return state;
    }
}