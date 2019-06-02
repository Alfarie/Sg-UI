import Vue from 'vue'
import { router } from '../../router/router'
import axios from '../../axios/axios'
import * as jwtAuth from '../../axios/jwtAuth'
import moment from 'moment';

var counterFlag = false;

const state = {
    isAuth: false,
    cognitoUser: null,
    authData: { tokenId: '' }
}

const getters = {
    cognitoUser(state) {
        return state.cognitoUser;
    },
    authData(state) {
        return state.authData;
    }
}

const actions = {
    LOGIN_USER: ({ dispatch, commit, state }, authData) => {
        axios.post('/auth/signin', authData).then(res => {
            var data = res.data;
            localStorage.setItem('login', moment().format('YYYY-MM-DD HH:mm:ss'));
            localStorage.setItem('expiresIn', data.expiresIn);
            localStorage.setItem('tokenId', data.tokenId);
            localStorage.setItem('username', data.username);
            state.authData = data;
            authenticationSuccess(dispatch);
        })
            .catch(err => {
                alert('authetication fail')
            })
    },
    LOGOUT_USER: ({ dispatch }) => {
        localStorage.clear();
        logoutSuccess(dispatch);
    },
    IS_AUTH: ({ dispatch, state }) => {
        isAuth(dispatch, state);
    }
}
// check is already logged in
// route to dashboard

const isAuth = async (dispatch, state) => {
    let isLoggedIn = jwtAuth.authUser();
    if (isLoggedIn){
        authenticationSuccess(dispatch);
        var data = {
            login: localStorage.getItem('login'),
            expiresIn: localStorage.getItem('expiresIn'),
            tokenId: localStorage.getItem('tokenId'),
            username: localStorage.getItem('username')
        }
        state.authData = data;
    }
}

// Init iot, route to dashboard
const authenticationSuccess = (dispatch) => {
    router.push('/summary');

    dispatch('SCONNECT')
    if (!counterFlag) {
        counterFlag = setTimeout(() => {
            dispatch('LOGOUT_USER');
            counterFlag = false;
        }, jwtAuth.expiresIn() * 1000);
    }
}

const logoutSuccess = (dispatch) => {
    dispatch('SDISCONNECT')
    location.reload();
}

export default {
    state,
    getters,
    actions
}
