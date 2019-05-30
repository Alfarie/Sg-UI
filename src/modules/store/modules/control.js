import control from '../../components/control/components/models/control.js'

import axios from '../../axios/axios'

const state = {
  control: control.control,
  sensorName: ['vpd', 'soil', 'par', 'temperature', 'humidity', 'co2', 'light']
}
var controlName = ['manual', 'timer', 'setbound', 'hybrid', 'irrigation', 'advancecondition', 'advancesetbound', 'advancetimingsetbound', 'dfirrigation']

const getters = {
  control: (state) => {
    return state.control
  },
  getControlName: (state) => {
    var data = []
    state.control.forEach(c => {
      data.push(controlName[c.mode])
    })
    return data
  },
  getSensorName: (state) => {
    return state.sensorName
  }
}

const mutations = {
  updateControl: (state, payload) => {
    state.control = payload
  }
}

const actions = {
  updateControl: ({commit, getters}, payload) => {
    axios.get('control/', {
      headers: {'x-access-token': getters.authData.tokenId}
    }).then(res => {
      // console.log(res.data);
      commit('updateControl', res.data)
    }).catch(err => console.log(err))
  },
  uploadControl: ({getters, state}, payload) => {
    axios.post('control/', {control: state.control[payload - 1]},
      {headers: {'x-access-token': getters.authData.tokenId}})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
