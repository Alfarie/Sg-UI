import axios from 'axios';
var hostname = window.location.hostname;
// var hostname = '192.168.100.1'
const instance = axios.create({
    baseURL: 'http://'+ hostname +':3000'
});
// instance.defaults.headers.common['SOMETHING'] = 'something-axios-auth'
export default instance