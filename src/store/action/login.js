import {LOGIN} from '../types'

export default {
    login:params=>({
        type:LOGIN,
        params
    })
};