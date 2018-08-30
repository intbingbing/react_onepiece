import * as api from '../api'

export const types = {
    SW_LANG : 'SW_LANG'
}
  
const init = {
    lang : 'cn'
};

export default function reducer(state = init, action) {
    switch(action.type) {
        case types.SW_LANG:
            return { ...state, ...action.params };
        default:
            return state
    }
}

export const action = {
    sw_lang : params => ({
        lang: params.lang
    })
}
