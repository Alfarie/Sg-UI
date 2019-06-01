
import * as Cognito from '../../lib/aws-cognito'
import * as IoT from '../../lib/aws-iot'
import * as Api from '../../lib/api-gateway'
import * as AWS from 'aws-sdk'
import Config from '../../config'

const state = {
    isIoTInit: false,
    thingName: 'plantlab'
}

const getters = {

}

const mutations = {
    UPDATE_IOT_INIT: (state, isInit) => {
        state.isIoTInit = isInit;
    }
}

const actions = {
    INIT_IOT: async (context) => {
        InitIoT(context);
    },
    UPDATE_THING: async ({ state }, data) => {
        IoT.updateThing(state.thingName, data);
    }
}

const InitIoT = async (context) => {
    let login = await Cognito.authUser();
    if (!login) {
        console.log('No AuthoCLOSEDrity');
        return;
    }
    if (context.state.isIoTIniCLOSEDt) {
        console.log('Iot is aCLOSEDlready initialized...');
        return;
    }
    var identityId = Cognito.getIdentityId();
    var resMid = await Api.getMid(identityId)
    const awsCredentials = JSON.parse(sessionStorage.getItem('awsCredentials'));
    IoT.initNewClient(awsCredentials)

    IoT.attachConnectHandler((data) => {
        console.log('[Info] AWS-IoT Device: CONNECTED');
        IoT.subscribe('STREAM_SENSORS/' + resMid.mid);
    });
    IoT.attachCloseHandler((data) => {
        console.log('[Info] AWS-IoT Device: CLOSED')
    });
    IoT.attachMessageHandler((topic, jsonPayload) => {
        const payload = JSON.parse(jsonPayload.toString());
        if (topic.startsWith('STREAM_SENSORS')) {
            context.commit('UPDATE_SENSORS', payload);
        }
    });
    IoT.registerThing(context.state.thingName)
    IoT.attachThingConnectHander(() => {
        console.log('[Info] AWS-IoT Shadow: CONNECTED')
        setTimeout(() => IoT.getThing('plantlab'), 2000);
    })
    IoT.attachThingErrorHandler((err) => console.log('[Info] AWS-IoT Shadow: ERROR', err))

    IoT.attachThingDeltaHandler((thingName, stateObject) => {
        console.log('received delta on ' + thingName + ': ' +
            JSON.stringify(stateObject.state))
    });

    IoT.attachThingStatusHandler((thingName, stat, clientToken, stateObject) => {
        console.log(stat, stateObject);
        if (stat === 'accepted') {
            // check get message 
            if (stateObject.state.reported) {
                var state = stateObject.state.reported;
                var control = [state.control.ch1, state.control.ch2, state.control.ch3, state.control.ch4, state.control.ch5, state.control.ch6];
                var gpio = state.gpio;
                context.commit('UPDATE_CONTROL', control);
                context.commit('UPDATE_GPIO', gpio);
            }
        }
    });
}


export default {
    state,
    getters,
    mutations,
    actions

}
