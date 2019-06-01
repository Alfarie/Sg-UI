import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import { store } from '../store'
import { router } from '../../router/router'

import {baseURL} from '../../axios/axios'

const state = {
    connect: false
}

const getters = {
    ConnectionStatus: (state) => {
        return state.connect;
    },
    connect: (state) => {
        return state.connect;
    },
    isConnect: (state) => {
        return (state.connect) ? 'System Connect' : 'System Offline';
    }
}

const mutations = {
    SOCKET_CONNECT: (state, status) => {
        console.log('SOCKET.IO: Connected');
        state.connect = true;
    },
    SOCKET_DISCONNECT: (state, status) => {
        console.log('SOCKET.IO: disconnceted');
        state.connect = false;
        router.push('/disconnect')
    },
    SOCKET_ERROR: (state, err) => {
        console.error(err);
    }
}

const actions = {
    SCONNECT: ({getters}) => {
        if(getters.connect) {
            return;
        }
        var querryString = 'auth_token=' + localStorage.getItem('tokenId');
        console.log('SOCKET.io: trying to connect to server ');
        // var hostname = "192.168.1.27";
        Vue.use(VueSocketio, socketio(baseURL, {query: querryString }), store);
    },
    SDISCONNECT: ()=>{
        Vue.prototype.$socket.disconnect();
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
