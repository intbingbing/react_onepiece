import {LOGIN} from '../types'

const initState = {
    logged:false
};

export default function login (state = initState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.params
            };
        default:
            return state
    }
}