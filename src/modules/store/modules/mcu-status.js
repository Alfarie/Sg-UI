import moment from 'moment'
const state = {
    gpio: [],
    memory: 0,
    paracc: [],
    sensors: {
        co2: 0,
        humidity: 0,
        par: 0,
        paracc: 0,
        soil: 0,
        temperature: 0,
        vpd: 0
    },
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm:ss'),

}

const getters = {
    getGpio: (state)=>{
        return state.gpio;
    },
    getChannelParAcc: (state)=>{
        return state.paracc;
    },
    getSensors(state) {
        return state.sensors;
    },
    getDate: state => {
        return state.date
    },
    getTime: state => {
        return state.time
    },
    getDateTime: state => {
        return { date: state.date, time: state.time }
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
    },
    SOCKET_DEVICE_DATA: (state, data) => {
        state.date = moment(data[0].datetime).format('YYYY-MM-DD')
        state.time = moment(data[0].datetime).format('HH:mm:ss')
        state.sensors = data[0].sensors;
        state.gpio = data[0].gpio;
        state.paracc = data[0].paracc;

        // console.log(state.paracc)
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
