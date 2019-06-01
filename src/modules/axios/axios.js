import axios from 'axios';

export let baseURL = ''
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://'+ window.location.hostname +':3000'
    //baseURL = 'http://smartgrobot.local'
    break

  default:
    baseURL = window.location.origin
}

console.log(baseURL)
export default axios.create({
    baseURL
})
