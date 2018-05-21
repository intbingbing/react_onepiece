import axios from 'axios'
import qs from 'qs'

const baseUrl='http://localhost:3030';
const loginUrl='/react/auth';
const echartsKLineUrl='/react/echarts_k_line';

axios.defaults.withCredentials = true;

const instance = axios.create({});

instance.interceptors.request.use(function (config) {
    if ( localStorage.getItem('token') && new Date(localStorage.getItem('timeout')) > new Date() ) {
        config.headers.Token = localStorage.getItem('token');
    } else {
        localStorage.clear();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export async function getEchartsKLine(){
    return (await instance.get(`${baseUrl}${echartsKLineUrl}`)).data
}

export async function login(params){
    return (await instance.post(`${baseUrl}${loginUrl}`,qs.stringify(
        {...params}
    ))).data;
}