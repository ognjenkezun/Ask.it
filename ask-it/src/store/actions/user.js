import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const sendUser = (payload) => (dispatch, getState) => {
    axios.post('http://localhost:3200/auth/register', payload)
        .then((response) => {
            dispatch(sendItemSuccess(response));
        });
}

const sendItemSuccess = (response) => {
    return {
        type: actionTypes.SEND_ITEM_SUCCESS,
        item: response.data
    }
}

export const authenticateUser = (payload) => (dispatch, getState) => {
    const promise = axios.post('http://localhost:3200/auth/login', {
        email: payload.email,
        password: payload.password
    })
        .then((response) => dispatch(authenticateUserSuccess(response)));
    return promise;
}

const authenticateUserSuccess = (response) => {
    return {
        type: actionTypes.AUTHENTICATE_USER_SUCCESS,
        user: response.data
    }
}

export const logoutUser = (payload) => (dispatch, getState) => {
    dispatch(logoutUserSuccess());
}

const logoutUserSuccess = (response) => {
    localStorage.removeItem("accessToken");
    return {
        type: actionTypes.LOGOUT_USER_SUCCESS,
        user: {}
    }
}