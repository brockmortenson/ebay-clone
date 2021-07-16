import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default createStore(rootReducer, composeWithDevTools());