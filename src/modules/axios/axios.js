import axios from 'axios';

export let baseURL = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://'+ window.location.hostname +':3000'
    break
  default:
    baseURL = window.location.origin
}

const instance = axios.create({
    baseURL
});
// instance.defaults.headers.common['SOMETHING'] = 'something-axios-auth'
export default instance
