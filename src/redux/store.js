import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import savedReducer from './savedReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    saved: savedReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));