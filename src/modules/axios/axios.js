import axios from 'axios';

export let baseURL = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://'+ window.location.hostname +':3000'
    //baseURL = 'http://smartgrobot.local'
    break

  default:
    baseURL = window.location.origin
}

export default axios.create({
    baseURL
})
