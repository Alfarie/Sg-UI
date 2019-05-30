import axios from '../../axios/axios'
import pkg from '../../../../package'
export default {
  state: {
    version: {
      sgmpu: '1.0.0',
      sgui: '1.0.0',
      sgmcu: '1.0.0',
      sgssr: '1.0.0'
    }
  },
  getters: {
    version: ({version}) => version,
    v_sgmpu: ({version: {sgmpu}}) => sgmpu,
    v_sgui: ({version: {sgui}}) => sgui,
    v_sgmcu: ({version: {sgmcu}}) => sgmcu,
    v_sgssr: ({version: {sgssr}}) => sgssr,
  },
  mutations: {
    v_sgmpu: ({version}, sgmpu) => version.sgmpu = sgmpu,
    v_sgui: ({version}, sgui) => version.sgui = sgui,
    v_sgmcu: ({version}, sgmcu) => version.sgmcu = sgmcu,
    v_sgssr: ({version}, sgssr) => version.sgssr = sgssr,
  },
  actions: {
    version: async ({commit}) => {
      const {data} = await axios.get('/version')
      const {sgmpu, sgmcu, sgssr} = data.version
      commit('v_sgmpu', sgmpu)
      commit('v_sgmcu', sgmcu)
      commit('v_sgssr', sgssr)
      commit('v_sgui', pkg.version)
    }
  }
}
