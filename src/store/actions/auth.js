import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const removeError = () => {
    return {
        type : actionTypes.CLEAR_ERROR
    }
}

export const hideModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}


export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://reactshopee.herokuapp.com/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            console.log('LOGIN SUCCESSFUL')
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            console.log(err.response)
            dispatch(authFail(err.response.data.non_field_errors))
        })
    }
}

export const authSignup = (username, email, password1,password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://reactshopee.herokuapp.com/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            console.log('SIGNUP SUCCESSFUL')
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            console.log(err.response)
            console.log(err.response.headers['content-length'])
            const contentLength = err.response.headers['content-length'];

            if (contentLength === "58" || contentLength === "140" || contentLength === "95" || contentLength === "109" || contentLength === "103"){
                console.log("hey");
                dispatch(authFail("Username already exists"));
                return
            }

            if (contentLength === "83" || contentLength === "46" || contentLength === "45"){
                console.log("hey");
                dispatch(authFail("Password is too common"));
                return
            }

            if (contentLength === "37"){
                console.log("hey");
                dispatch(authFail("Password is entirely numeric"));
                return
            }
            // dispatch(authFail("wait for some time"))
            
            // dispatch(authFail(err.response.data.non_field_errors))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}