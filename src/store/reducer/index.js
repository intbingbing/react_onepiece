import {combineReducers} from 'redux'
import login from './login'
import test from './test'
export const rootReducers = combineReducers({login, test});