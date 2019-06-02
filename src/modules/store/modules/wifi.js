import axios from '../../axios/axios'
import moment from 'moment'

const state = {
    AvailableWifi: [],
    CurrentWifi: {}
}

const getters = {
   AvailableWifi: (state)=>{
       return state.AvailableWifi;
   },
   CurrentWifi: (state)=>{
       return state.CurrentWifi;
   }
}

const mutations = {
   setAvailableWifi: (state,payload)=>{
       state.AvailableWifi = payload;
   },
   setCurrentWifi: (state,payload)=>{
       state.CurrentWifi = payload;
   }
}

const actions = {
    GetAvailableWifi: ({commit,getters})=>{
        axios.get('/wifi/scan', { headers:{ 'x-access-token': getters.authData.tokenId}})
            .then(res=>{
                if(res.data.msg == 'success')
                    commit('setAvailableWifi', res.data.data);
                else
                    commit('setAvailableWifi', []);
            })
    },
    GetCurrentWifi: ({commit,getters})=>{
        axios.get('/wifi/current', { headers:{ 'x-access-token': getters.authData.tokenId}})
            .then(res=>{
                if(res.data.msg == 'success')
                    commit('setCurrentWifi', res.data);
                else
                    commit('setCurrentWifi', {});
            })
    },
    Disconnect: async ({commit})=>{
        await axios.get('/wifi/disconnect')
    },
    Connect: ({commit,dispatch},payload)=>{
        dispatch('popUpWifi', 'pending')
        axios.post('/wifi/connect',payload)
        .then(res=>{
            if(res.data.msg == 'success'){
                dispatch('popUpWifi', 'success')
                dispatch('GetCurrentWifi')
            }
            else{
                dispatch('popUpWifi', 'fail')
                dispatch('GetCurrentWifi')
            }
        })
        .catch( () => false)
    },
    APMode: async ({getters,dispatch},payload)=>{
        await axios.post('/wifi/apmode',payload,{ headers:{ 'x-access-token': getters.authData.tokenId}})
    },
    STAMode: async ({getters,dispatch},payload)=>{
        await axios.post('/wifi/stamode',payload,{ headers:{ 'x-access-token': getters.authData.tokenId}})
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
