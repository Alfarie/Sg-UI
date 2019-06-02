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
  updateControl: async ({commit, getters}, payload) => {
    await axios.get('control/', {
      headers: {'x-access-token': getters.authData.tokenId}
    }).then(res => commit('updateControl', res.data))
  },
  uploadControl: async ({getters, state}, payload) => {
    await axios.post('control/', {control: state.control[payload - 1]},
      {headers: {'x-access-token': getters.authData.tokenId}})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
