import Vue from 'vue';
import control from '../../components/control/components/models/control.js';

import axios from '../../axios/axios';
const state = {
    control: control.control
}

var controlName = ['manual', 'timer', 'setpoint', 'setbound', 'irrigation']
const getters = {
    control: (state)=>{
        return state.control;
    },
    getControlName: (state)=>{
        var data = []
        state.control.forEach(c=>{
            data.push(controlName[c.mode]);
        })
        return data;
    }
}

const mutations = {
    updateControl: (state, payload)=>{
        state.control = payload;
    }
}

const actions = {
    updateControl: ( {commit} , payload)=>{
        axios.get('control/')
        .then( res=> {
            commit('updateControl', res.data);
        })
        .catch(err=> console.log(err))
    },
    uploadControl: ({commit,state}, payload)=>{
        axios.post('control/',{
            control: state.control[payload-1]
        })
        .then(res=> console.log(res))
        .catch(err=>console.log(err))
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}