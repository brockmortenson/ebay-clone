import { createStore, combineReducers } from 'redux';
import { composedWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer
});

export default createStore(rootReducer, composedWithDevTools());