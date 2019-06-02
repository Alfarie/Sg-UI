import axiosNetwork from '../../axios/axios-network'

const state = {
    wifis: []
}

const getters = {
    wifis: (state)=>{
        return state.wifis;
    }
}

const mutations = {
    wifisUpdate: (state, wifis)=>{
        state.wifis = wifis;
    }
}

const actions = {
    connectWifi: ({commit}, wifiAuth)=>{
      axiosNetwork.post('connect', wifiAuth)
    },
    scanWifi: ({commit})=>{
        /*
            res.data.payload:
            {
                'ssid1': data,
                'ssid2': data2,
                ...
            }
            data:ssid:"78:44:76:ec:eb:80"
                 flags:"[WPA2-PSK-CCMP][WPS][ESS]"
                 frequency:"2412"
                 signal_level:"-10"
                 ssid:"ABDUKARIM"
        */
        axiosNetwork.get('scan')
        .then(res=> {

            let wifilist = res.data.payload;
            let wifis = [];
            for(let key in wifilist ){
                const data = {
                    ssid: wifilist[key].ssid,
                    quality: dBmToQuality( parseInt(wifilist[key].signal_level)),
                    siglv: wifilist[key].signal_level
                }
                wifis.push(data);
            }
            commit('wifisUpdate', wifis);
        })
        .catch(err=> console.log(err))
    }
}

function dBmToQuality(dbm){
    if(dbm <= -100){
        return 0
    }
    else if(dbm >= -50){
        return 100
    }
    else{
        return 2 * (dbm + 100);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
