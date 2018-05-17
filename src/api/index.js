import axios from 'axios'
import qs from 'qs'
import store from '@/store'

const baseUrl='http://118.25.16.102:3000';
const loginUrl='/react/auth';
const weatherUrl='/api/proxy/weather';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    if ( localStorage.getItem('token') && new Date(localStorage.getItem('timeout')) > new Date() ) {
        config.headers.Token = localStorage.getItem('token');
    } else {
        localStorage.clear();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export async function getWeather(){
    return (await axios.get(`${baseUrl}${weatherUrl}`)).data
}

export async function login(params){
    return (await axios.post(`${baseUrl}${loginUrl}`,qs.stringify(
        {...params}
    ))).data;
}