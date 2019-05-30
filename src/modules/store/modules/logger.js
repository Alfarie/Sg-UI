import Vue from 'vue'
import axios from '../../axios/axios';
const state = {
    shortLogger: [],
    allDayLogger: [],
    sparklineLogger: [],
    selectedSensor: 'soil',
    loggerFetchingStatus: 'no-record', // no-record, fetching, fetched
    currentDate: '',
    parAccLog: [],
    parStatistic: {}
}
const getters = {
    parAccLog: (state)=>{
        return state.parAccLog;
    },
    shortLogger: function(state){
        return state.shortLogger;
    },
    allDayLogger: function(state){
        return state.allDayLogger;
    },
    sparklineLogger: function(state){
        return state.sparklineLogger;
    },
    selectedSensor: function(state){
        return state.selectedSensor;
    },
    loggerFetchingStatus: function(state){
        return state.loggerFetchingStatus;
    },
    currentDate: function(state){
        return state.currentDate;
    }
}

const mutations = {
    updateShortLogger: function(state,payload){
        state.shortLogger = payload;
    },
    updateAllDayLogger: function(state, payload){
        state.allDayLogger = payload;
    },
    updateSparklineLogger: function(state, payload){
        state.sparklineLogger = payload;
    },
    updateLoggerFetchingStatus: function(state, payload){
        state.loggerFetchingStatus = payload;
    },
    updateSelectedSensor: function(state, payload){
        state.selectedSensor = payload;
    },
    updateCurrentDate: function(state, payload){
        state.currentDate = payload;
    }
}


const actions = {
    updateShortLogger: function({commit}, payload){
        axios.get('logger/finds/short')
        .then(
            (res)=>{
                commit('updateShortLogger', res.data);
            }
        )
        .catch(err=>{console.log(err);})
    },
    updateAllDayLogger: function({commit}, payload){
        axios.get('logger/finds/date', {
            params: {
                date: payload
            }
        })
        .then( res=>{
            let result = res.data;
            if(result.status == 'Error'){
                commit('updateAllDayLogger', []);
            }
            else{
                commit('updateAllDayLogger', res.data);
            }
            commit('updateLoggerFetchingStatus', 'fetched')
        })

    },
    getParAccLogger: ({state,getters}, payload) => {
        axios.get('logger/gets/date/paracc', { 
            headers:{ 'x-access-token': getters.authData.tokenId},
            params: {
                date: 'DATE'+ getters.getDate
            }
        }
        ).then( res => {
            console.log(res.data);
            state.parAccLog = res.data;
            
        })
        .catch( err =>{
            console.log(err);
        })
    },
    getLoggerInterval: ({commit,getters}) => {
        axios.get('logger/gets/date/intervals', { 
            headers:{ 'x-access-token': getters.authData.tokenId},
            params: {
                date: 'DATE'+ getters.getDate,
                minute: 1
            }
        }
        ).then( res => {
            console.log(res.data);
            
        })
        .catch( err =>{
            console.log(err);
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}