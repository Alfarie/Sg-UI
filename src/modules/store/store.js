import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import auth from './modules/auth'
import socket from './modules/socket'
import iot from './modules/iot'
import ui from './modules/ui-status'
import control from './modules/control'
import logger from './modules/logger'
import mcu from './modules/mcu-status'
import setting from './modules/setting'
import wifi from './modules/wifi'
import deviceInfo from './modules/device-info'

export const store = new Vuex.Store({
    modules: {
        auth,
        iot,
        ui,
        control,
        socket,
        mcu,
        logger,
        setting,
        wifi,
        deviceInfo
    }
})
