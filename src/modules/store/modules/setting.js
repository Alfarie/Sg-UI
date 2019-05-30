
import axios from '../../axios/axios';
const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  updateDateTime({dispatch,getters}, payload) {
    dispatch('popupUpdateModal');
    axios.post('setting/datetime', payload,{ headers: { 'x-access-token': getters.authData.tokenId } })
    .then(res=>console.log(res.data))
      
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
