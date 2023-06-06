
import { constants } from "../Actions";

const { LOGIN_USER, LOGOUT_USER, } = constants

const initialState = {
    user: null
};

const handleUserLogin = (state, userData) => {
    let final = {
        ...state,
        user: userData
    }

    return final
}

const handleUserLogout = (state, userData) => {
    let final = {
        ...state,
        user: userData
    }

    return final
}

const userReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case LOGIN_USER:
            return handleUserLogin(state, action.payload);
        case LOGOUT_USER:
            return handleUserLogout(state, action.payload);
        default:
            return state;
    }
}

export {
    userReducer
}