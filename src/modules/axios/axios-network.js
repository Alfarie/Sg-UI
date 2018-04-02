import axios from 'axios'

var hostname = '192.168.1.18';
const instance = axios.create({
    baseURL: 'http://'+ hostname +':8080'
});

export default instance