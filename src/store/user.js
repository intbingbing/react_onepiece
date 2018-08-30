export const types = {
    SET_USER: 'SET_USER'
}

let init = {
    lang: 'cn',
    theme: 'common',
    avatar: '',
    name: '',
    cover: '',
    isLogin: false,
}

export default function reducer(state = init, action) {
    switch(action.type) {
        case types.SET_USER:
            return { ...state, ...action.params }
        default:
            return state
    }
}

export const action = {
    setUser: params => ({ 
        type: types.SET_USER,
        params
    })
}