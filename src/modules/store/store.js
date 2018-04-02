import Vue from 'vue'
import Vuex from 'vuex'

import sensors from './modules/sensors'
import datetime from './modules/datetime'
import socket from './modules/socket'
import control from './modules/control'
import logger from './modules/logger'
import status from './modules/mcu-status'
import network from './modules/network'
import auth from './modules/auth'

Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        sensors,
        datetime,
        socket,
        control,
        logger,
        status,
        network,
        auth
    }
})
