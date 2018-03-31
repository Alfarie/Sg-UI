const state = {
    gpio: [],
    memory: 0,
    paracc: []
}

const getters = {
    GetStatus(state){
        return {
            gpio: state.gpio,
            memory: state.memory,
            paracc: state.paracc
        }
    }
}

const mutations ={
    SOCKET_GPIO:(state, data)=>{
        state.gpio = data[0];
    },
    SOCKET_MEMORY:(state, data)=>{
        state.memory = data[0];
    },
    SOCKET_PARACC:(state, data)=>{
        state.paracc = data[0];
    }
}

const actions = {

}

export default{
    state,
    getters,
    mutations,
    actions
}