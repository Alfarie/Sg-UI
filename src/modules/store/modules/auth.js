import axios from '../../axios/axios';
import {router} from '../../router/router'
const state = {
  tokenId: null,
  username: null,
  authMessage: null
}

const mutations = {
  authUser(state, authData) {
    state.tokenId = authData.tokenId;
    state.username = authData.username;
  },
  authMessage: (state, message) => {
    state.authMessage = message;
  },
  clearAuthData(state) {
    state.tokenId = null;
    state.username = null;
  }
}


const actions = {
  tryAutoLogin({commit}) {
    const tokenId = localStorage.getItem('token');
    if (!tokenId) {
      return;
    }
    const expirationDate = localStorage.getItem('expiresDate');
    const now = new Date();
    if (now >= expirationDate) {
      return;
    }
    const username = localStorage.getItem('username');
    commit('authUser', {
      tokenId: tokenId,
      username: username
    })
  },
  setLogoutTime({
    dispatch
  }, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime * 1000)
  },
  login: ({
    commit,
    dispatch
  }, authData) => {
    axios.post('/auth/signin', authData)
      .then(res => {
        if (res.data.success) {
          commit('authUser', res.data);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('token', res.data.tokenId);
          localStorage.setItem('expiresDate', expirationDate)
          localStorage.setItem('username', res.data.username);
          dispatch('setLogoutTime', res.data.expiresIn);
          router.replace({name: 'summary'})
          commit('authMessage',null);
        }else{
          commit('authMessage', res.data.message);
        }
      })
      .catch(err => console.log(err))
  },
  logout({commit}) {
    commit('clearAuthData');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/')
  }
}

const getters = {
  authMessage: (state) => {
    return state.authMessage
  },
  isAuth: (state) => {
    return (state.tokenId !== null) ? true : false;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
