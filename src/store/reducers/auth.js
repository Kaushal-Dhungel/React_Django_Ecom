import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: '', 
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: '',
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const clrErr = (state,action) => {
    return updateObject(state,{
        error : '',
    })
}

const closeModal = (state,action) => {
    return updateObject(state,{
        showModal : false
    })
}


const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

const AuthReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.CLEAR_ERROR: return clrErr(state,action);
        case actionTypes.CLOSE_MODAL: return closeModal(state,action);
        default:
            return state;
    }
}

export default AuthReducer;