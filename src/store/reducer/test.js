import {TEST} from '../types'

const initState = {
    test:'',
    test2:''
};

export default function test (state = initState, action) {
    switch(action.type) {
        case TEST:
            console.log(action)
            return {
                ...state,
            };
        default:
            return state
    }
}