import { combineReducers } from 'redux';
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
});