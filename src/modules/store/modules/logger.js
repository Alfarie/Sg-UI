import Vue from 'vue'
import axios from '../../axios/axios';
const state = {
    shortLogger: [],
    allDayLogger: [],
    sparklineLogger: [],
    selectedSensor: 'soil',
    loggerFetchingStatus: 'no-record', // no-record, fetching, fetched
    currentDate: ''
}
const getters = {
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
    updateSparklineLogger: function({commit}, payload){
        axios.get('logger/finds/sparks')
        .then(res=>commit('updateSparklineLogger', res.data))
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}