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
                console.log(res.data);
                if(res.data.msg == 'success')
                    commit('setAvailableWifi', res.data.data);
                else
                    commit('setAvailableWifi', []);
            })
            .catch(err=>{
                console.log(err);
            })
    },
    GetCurrentWifi: ({commit,getters})=>{
        axios.get('/wifi/current', { headers:{ 'x-access-token': getters.authData.tokenId}})
            .then(res=>{
                console.log(res.data);
                if(res.data.msg == 'success')
                    commit('setCurrentWifi', res.data);
                else
                    commit('setCurrentWifi', {});
            })
            .catch(err=>{
                console.log(err);
            })
    },
    Disconnect: ({commit})=>{
        axios.get('/wifi/disconnect')
            .then(res=>{
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    },
    Connect: ({commit,dispatch},payload)=>{
        dispatch('popUpWifi', 'pending')
        axios.post('/wifi/connect',payload)
        .then(res=>{
            console.log(res.data);
            if(res.data.msg == 'success'){
                dispatch('popUpWifi', 'success')
                dispatch('GetCurrentWifi')
            }
            else{
                dispatch('popUpWifi', 'fail')
                dispatch('GetCurrentWifi')
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    APMode: ({getters,dispatch},payload)=>{
        axios.post('/wifi/apmode',payload,{ headers:{ 'x-access-token': getters.authData.tokenId}})
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        },)
    },
    STAMode: ({getters,dispatch},payload)=>{
        axios.post('/wifi/stamode',payload,{ headers:{ 'x-access-token': getters.authData.tokenId}})
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        },)
    }
    
}

export default { 
    state,
    getters,
    mutations,
    actions
}