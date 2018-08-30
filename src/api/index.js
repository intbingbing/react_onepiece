import axios from 'axios'
import qs from 'qs'
import * as publicUrl from './url'

axios.defaults.withCredentials = true;
window.axios = axios
const instance = axios.create({});

instance.interceptors.request.use(function (config) {
    if ( localStorage.getItem('token') ) {
        config.headers.token = localStorage.getItem('token');
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

async function tryReq( url, params = {}, method = 'get', header = {
    headers: 
        {"Content-Type": "application/x-www-form-urlencoded "}
    }
){
    try{
        // return new Promise((resolve,reject)=>{
        //     setTimeout(()=>{resolve({code:'200110',data:{a:666}});console.log(6666)},3000);
        // })
        let res
        if (header.headers && header.headers['Content-Type'] 
        && header.headers['Content-Type'] === 'multipart/form-data') {
            res = await instance[method](`${publicUrl.base}${url}`, params.formData, header)
        } else {
            res = await instance[method](`${publicUrl.base}${url}`, 
                qs.stringify({...params}), 
                header
            )
        }
        return res.data;
    }catch(err){
        console.error(err)
        err.code = -1
        err.msg = err.message
        return err
    }
    // try{
    //     return await instance[method](`${publicUrl.base}${url}`,qs.stringify(
    //         {...params}
    //     ))
    // }catch(err){
    //     throw new Error(err);
    // }
}

export async function getEchartsKLine(){
    //return await tryReq(loginUrl).data
}

export async function login(params){
    let res =  await tryReq(publicUrl.login, params, 'post')
    return res
}

export async function quicklogin(){
    return await tryReq(publicUrl.quicklogin)
}

export async function uploadAvatar(params){
    return await tryReq(publicUrl.avatar, params, 'post', {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}