import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './actionTypes';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:6156/api/auth/signin`, { email, password });
        localStorage.setItem('token', response.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return true;
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        return false;
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};