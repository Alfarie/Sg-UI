import Vue from 'vue'
import VueRouter from 'vue-router'
import MultiLanguage from 'vue-multilanguage'
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import {store} from './modules/store/store.js'
import {router} from './modules/router/router.js';
import './filters.js';
import axios from './modules/axios/axios';


Vue.use(VueRouter);


var hostname = window.location.hostname;
// var hostname = '192.168.100.1'
Vue.use(VueSocketio, socketio('http://'+ hostname +':3000'), store);




import App from './App.vue'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
