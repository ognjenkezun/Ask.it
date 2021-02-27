import * as actionTypes from '../actionTypes'
import { updateObject } from '../utility'

const initialState = {
    user: {}
}

const authenticateUser = (state, action) => {
    action.user.token && localStorage.setItem("accessToken", action.user.token);
    return updateObject(state, {
        user: action.user
    })
}

const logoutUser = (state, action) => {
    return updateObject(state, {
        user: action.user
    })
}

const sendUser = (state, action) => {
    localStorage.setItem("accessToken", action.item.token);
    return updateObject(state, {
        user: action.user
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER_SUCCESS: return authenticateUser(state, action);
        case actionTypes.LOGOUT_USER_SUCCESS: return logoutUser(state, action);
        case actionTypes.SEND_ITEM_SUCCESS: return sendUser(state, action);

        default: return state;
    }
}

export default reducer