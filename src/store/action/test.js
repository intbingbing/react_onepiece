import {TEST} from '../types'

export default {
    test:params=>({
        type:TEST,
        ...params
    })
};